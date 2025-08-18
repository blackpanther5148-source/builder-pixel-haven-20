import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// File upload rate limiting
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit file uploads to 10 per hour per IP
  message: {
    error: "Too many file uploads from this IP, please try again later."
  }
});

// API rate limiting  
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Higher limit for authenticated API calls
  message: {
    error: "API rate limit exceeded, please try again later."
  }
});

// Security headers and protection
export const securityMiddleware = [
  // Basic security headers
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.sentry.io"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),

  // Apply general rate limiting
  limiter,

  // Request sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Sanitize request body to prevent XSS
    if (req.body && typeof req.body === 'object') {
      sanitizeObject(req.body);
    }
    
    // Validate and sanitize query parameters
    if (req.query && typeof req.query === 'object') {
      sanitizeObject(req.query);
    }
    
    next();
  },

  // Security headers for file uploads
  (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/upload')) {
      // Apply stricter rate limiting for uploads
      return uploadLimiter(req, res, next);
    }
    
    if (req.path.startsWith('/api/')) {
      // Apply API rate limiting
      return apiLimiter(req, res, next);
    }
    
    next();
  }
];

// Utility function to sanitize objects recursively
function sanitizeObject(obj: any): void {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'string') {
        // Basic XSS prevention - remove script tags and javascript: protocols
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  }
}

// Semgrep security scanning for uploaded files
export async function scanFileWithSemgrep(filePath: string, fileName: string): Promise<{
  safe: boolean;
  findings: any[];
  scanId: string;
}> {
  try {
    // This will integrate with the Semgrep MCP server
    // For now, return a mock implementation
    
    const scanId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock security scan - in real implementation this would call Semgrep MCP
    const mockFindings = [];
    const isSafe = true;

    // Log the scan for audit purposes
    console.log(`Security scan initiated for file: ${fileName} (ID: ${scanId})`);
    
    return {
      safe: isSafe,
      findings: mockFindings,
      scanId: scanId
    };
    
  } catch (error) {
    console.error('Semgrep scan failed:', error);
    // Fail safe - if scan fails, mark as unsafe
    return {
      safe: false,
      findings: [{ 
        type: 'scan_error', 
        message: 'Security scan failed',
        severity: 'high'
      }],
      scanId: `error_${Date.now()}`
    };
  }
}

// File type validation
export function isAllowedFileType(mimetype: string, filename: string): boolean {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  const fileExtension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  return allowedTypes.includes(mimetype) && allowedExtensions.includes(fileExtension);
}

// Content validation for text inputs
export function validateTextContent(content: string): {
  valid: boolean;
  reason?: string;
} {
  // Check for malicious content patterns
  const maliciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /onload|onclick|onerror/gi,
    /data:text\/html/gi
  ];
  
  for (const pattern of maliciousPatterns) {
    if (pattern.test(content)) {
      return {
        valid: false,
        reason: 'Content contains potentially malicious code'
      };
    }
  }
  
  // Check content length
  if (content.length > 50000) {
    return {
      valid: false,
      reason: 'Content exceeds maximum length limit'
    };
  }
  
  return { valid: true };
}
