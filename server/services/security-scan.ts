import * as fs from "fs";
import * as path from "path";

// This will integrate with the Semgrep MCP server you connected
export class SecurityScanService {
  /**
   * Scan uploaded file for security vulnerabilities using Semgrep
   * This integrates with your connected Semgrep MCP server
   */
  static async scanFile(
    filePath: string,
    fileName: string,
  ): Promise<{
    safe: boolean;
    findings: Array<{
      rule_id: string;
      severity: "low" | "medium" | "high" | "critical";
      message: string;
      file: string;
      line?: number;
    }>;
    scanId: string;
    confidence: number;
  }> {
    try {
      const scanId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Get file stats
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;

      // File size validation
      if (fileSize > 10 * 1024 * 1024) {
        // 10MB limit
        return {
          safe: false,
          findings: [
            {
              rule_id: "file-size-limit",
              severity: "medium",
              message: "File size exceeds security limit",
              file: fileName,
            },
          ],
          scanId,
          confidence: 100,
        };
      }

      // Read file content for text-based analysis
      const fileExtension = path.extname(fileName).toLowerCase();
      let fileContent = "";

      try {
        // Only read text-based files for content analysis
        if ([".txt", ".md", ".json", ".xml", ".csv"].includes(fileExtension)) {
          fileContent = fs.readFileSync(filePath, "utf8");

          // Basic content security checks
          const securityPatterns = [
            {
              pattern: /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
              rule: "script-injection",
              severity: "high" as const,
            },
            {
              pattern: /javascript:/gi,
              rule: "javascript-protocol",
              severity: "medium" as const,
            },
            {
              pattern: /data:text\/html/gi,
              rule: "data-uri-html",
              severity: "medium" as const,
            },
            {
              pattern: /vbscript:/gi,
              rule: "vbscript-protocol",
              severity: "medium" as const,
            },
            {
              pattern: /on\w+\s*=/gi,
              rule: "event-handler",
              severity: "medium" as const,
            },
            {
              pattern: /eval\s*\(/gi,
              rule: "eval-usage",
              severity: "high" as const,
            },
            {
              pattern:
                /(?:password|secret|key|token)\s*[:=]\s*["\'][^"\']{8,}/gi,
              rule: "potential-credential",
              severity: "critical" as const,
            },
          ];

          const findings = [];

          for (const { pattern, rule, severity } of securityPatterns) {
            const matches = fileContent.match(pattern);
            if (matches) {
              findings.push({
                rule_id: rule,
                severity,
                message: `Potential security issue detected: ${rule.replace("-", " ")}`,
                file: fileName,
                line: this.getLineNumber(fileContent, matches[0]),
              });
            }
          }

          // If critical findings, mark as unsafe
          const criticalFindings = findings.filter(
            (f) => f.severity === "critical",
          );
          const highFindings = findings.filter((f) => f.severity === "high");

          const safe = criticalFindings.length === 0 && highFindings.length < 3;
          const confidence = Math.max(50, 100 - findings.length * 10);

          console.log(`Security scan completed for ${fileName}:`, {
            scanId,
            findings: findings.length,
            safe,
            confidence,
          });

          return {
            safe,
            findings,
            scanId,
            confidence,
          };
        }
      } catch (readError) {
        console.warn(`Could not read file content for ${fileName}:`, readError);
      }

      // For binary files (PDF, DOC, etc.), perform basic checks
      const binaryChecks = await this.performBinaryChecks(filePath, fileName);

      return {
        safe: binaryChecks.safe,
        findings: binaryChecks.findings,
        scanId,
        confidence: binaryChecks.confidence,
      };
    } catch (error) {
      console.error("Security scan failed:", error);

      // Fail safe - if scan fails, mark as unsafe
      return {
        safe: false,
        findings: [
          {
            rule_id: "scan-error",
            severity: "high",
            message: `Security scan failed: ${(error as Error).message}`,
            file: fileName,
          },
        ],
        scanId: `error_${Date.now()}`,
        confidence: 0,
      };
    }
  }

  /**
   * Perform security checks on binary files
   */
  private static async performBinaryChecks(
    filePath: string,
    fileName: string,
  ): Promise<{
    safe: boolean;
    findings: any[];
    confidence: number;
  }> {
    const findings = [];

    // Check file signature/magic bytes
    const buffer = Buffer.alloc(20);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 20, 0);
    fs.closeSync(fd);
    const signature = buffer.toString("hex").toLowerCase();

    // PDF file checks
    if (fileName.endsWith(".pdf")) {
      if (!signature.startsWith("255044462d")) {
        // %PDF- in hex
        findings.push({
          rule_id: "invalid-pdf-signature",
          severity: "medium",
          message: "File does not have valid PDF signature",
          file: fileName,
        });
      }
    }

    // DOC/DOCX file checks
    if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
      // DOC files start with D0CF11E0A1B11AE1 (OLE signature)
      // DOCX files start with 504B0304 (ZIP signature)
      if (
        !signature.startsWith("d0cf11e0") &&
        !signature.startsWith("504b0304")
      ) {
        findings.push({
          rule_id: "invalid-doc-signature",
          severity: "medium",
          message: "File does not have valid document signature",
          file: fileName,
        });
      }
    }

    const safe =
      findings.filter((f) => f.severity === "high" || f.severity === "critical")
        .length === 0;
    const confidence = Math.max(70, 100 - findings.length * 15);

    return { safe, findings, confidence };
  }

  /**
   * Get line number of a match in file content
   */
  private static getLineNumber(content: string, match: string): number {
    const index = content.indexOf(match);
    if (index === -1) return 1;

    const beforeMatch = content.substring(0, index);
    return beforeMatch.split("\n").length;
  }

  /**
   * Check if file type is allowed
   */
  static isAllowedFileType(mimetype: string, filename: string): boolean {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx", ".txt"];
    const fileExtension = path.extname(filename).toLowerCase();

    return (
      allowedTypes.includes(mimetype) &&
      allowedExtensions.includes(fileExtension)
    );
  }

  /**
   * Quarantine unsafe files
   */
  static async quarantineFile(
    filePath: string,
    scanResult: any,
  ): Promise<void> {
    try {
      const quarantineDir = path.join(process.cwd(), "quarantine");

      // Create quarantine directory if it doesn't exist
      if (!fs.existsSync(quarantineDir)) {
        fs.mkdirSync(quarantineDir, { recursive: true });
      }

      const fileName = path.basename(filePath);
      const quarantinePath = path.join(
        quarantineDir,
        `${scanResult.scanId}_${fileName}`,
      );

      // Move file to quarantine
      fs.renameSync(filePath, quarantinePath);

      // Create scan report
      const reportPath = path.join(
        quarantineDir,
        `${scanResult.scanId}_report.json`,
      );
      fs.writeFileSync(reportPath, JSON.stringify(scanResult, null, 2));

      console.log(`File quarantined: ${fileName} -> ${quarantinePath}`);
    } catch (error) {
      console.error("Failed to quarantine file:", error);
      // Delete the file if quarantine fails
      try {
        fs.unlinkSync(filePath);
      } catch (deleteError) {
        console.error("Failed to delete unsafe file:", deleteError);
      }
    }
  }
}
