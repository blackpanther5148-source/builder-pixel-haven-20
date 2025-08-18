import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import * as Sentry from "@sentry/node";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Import route handlers
import { handleDemo } from "./routes/demo";
import { authRoutes } from "./routes/auth";
import { resumeRoutes } from "./routes/resumes";
import { coverLetterRoutes } from "./routes/cover-letters";
import { jobApplicationRoutes } from "./routes/job-applications";
import { portfolioRoutes } from "./routes/portfolio";
import { interviewRoutes } from "./routes/interviews";
import { jobMatchRoutes } from "./routes/job-match";
import { analyticsRoutes } from "./routes/analytics";
import { securityMiddleware } from "./middleware/security";
import { errorHandler } from "./middleware/error-handler";

// Initialize Sentry for error monitoring
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: 1.0,
  });
}

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only PDF, DOC, DOCX files
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
        ),
      );
    }
  },
});

export function createServer() {
  const app = express();

  // Sentry request handler must be the first middleware
  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
  }

  // Security middleware
  app.use(securityMiddleware);

  // Core middleware
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Static file serving for uploads
  app.use("/uploads", express.static("uploads"));

  // Database connection middleware
  app.use((req: any, res, next) => {
    req.db = pool;
    next();
  });

  // Health check endpoint
  app.get("/api/health", async (req: any, res) => {
    try {
      // Test database connection
      const result = await req.db.query("SELECT NOW()");
      res.json({
        status: "healthy",
        timestamp: result.rows[0].now,
        database: "connected",
        environment: process.env.NODE_ENV || "development",
      });
    } catch (error) {
      console.error("Health check failed:", error);
      Sentry.captureException(error);
      res.status(500).json({
        status: "unhealthy",
        error: "Database connection failed",
      });
    }
  });

  // Basic ping endpoint
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  // Legacy demo endpoint
  app.get("/api/demo", handleDemo);

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/resumes", resumeRoutes);
  app.use("/api/cover-letters", coverLetterRoutes);
  app.use("/api/job-applications", jobApplicationRoutes);
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/interviews", interviewRoutes);
  app.use("/api/job-match", jobMatchRoutes);
  app.use("/api/analytics", analyticsRoutes);

  // File upload endpoint with security scanning
  app.post("/api/upload", upload.single("file"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Store file information in database
      const fileData = {
        user_id: req.user?.id, // Assuming user is attached via auth middleware
        original_filename: req.file.originalname,
        stored_filename: req.file.filename,
        file_type: req.file.mimetype,
        file_size: req.file.size,
        file_path: req.file.path,
      };

      const result = await req.db.query(
        `INSERT INTO file_uploads (user_id, original_filename, stored_filename, file_type, file_size, file_path)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [
          fileData.user_id,
          fileData.original_filename,
          fileData.stored_filename,
          fileData.file_type,
          fileData.file_size,
          fileData.file_path,
        ],
      );

      // Trigger security scan (async)
      // This will be implemented with Semgrep integration

      res.json({
        success: true,
        file_id: result.rows[0].id,
        message: "File uploaded successfully",
        file: {
          id: result.rows[0].id,
          original_name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error("File upload error:", error);
      Sentry.captureException(error);
      res.status(500).json({ error: "File upload failed" });
    }
  });

  // Context7 integration for help and documentation
  app.get("/api/help", async (req, res) => {
    try {
      const { topic } = req.query;

      // This will integrate with Context7 MCP for documentation
      res.json({
        topic: topic || "general",
        help_content: "Context7 integration coming soon",
        suggestions: [],
      });
    } catch (error) {
      console.error("Help API error:", error);
      Sentry.captureException(error);
      res.status(500).json({ error: "Help service unavailable" });
    }
  });

  // Global error handling
  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
  }

  app.use(errorHandler);

  return app;
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});
