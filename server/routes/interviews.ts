import express, { Request, Response } from "express";
import { Pool } from "pg";
import { z } from "zod";
import {
  ValidationError,
  asyncHandler,
  handleDatabaseError,
} from "../middleware/error-handler";
import { authenticateToken } from "./auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string; email: string; firstName: string; lastName: string };
  db: Pool;
}

const interviewSessionSchema = z.object({
  type: z.enum(["technical", "behavioral", "leadership"]),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      category: z.string(),
      difficulty: z.enum(["easy", "medium", "hard"]),
    }),
  ),
  responses: z
    .array(
      z.object({
        questionId: z.string(),
        response: z.string(),
        duration: z.number().optional(),
      }),
    )
    .optional()
    .default([]),
});

// Start new interview session
router.post(
  "/sessions",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validation = interviewSessionSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        "Invalid interview session data",
        validation.error.errors,
      );
    }

    const { type, questions } = validation.data;
    const userId = req.user!.id;

    try {
      const result = await req.db.query(
        `INSERT INTO interview_sessions (user_id, type, questions)
       VALUES ($1, $2, $3) RETURNING *`,
        [userId, type, JSON.stringify(questions)],
      );

      res.status(201).json({
        success: true,
        session: result.rows[0],
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Get interview sessions
router.get(
  "/sessions",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const result = await req.db.query(
        `SELECT * FROM interview_sessions 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
        [userId],
      );

      res.json({
        success: true,
        sessions: result.rows,
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

export { router as interviewRoutes };
