import express, { Request, Response } from "express";
import { Pool } from "pg";
import { z } from "zod";
import { 
  ValidationError, 
  NotFoundError,
  asyncHandler,
  handleDatabaseError 
} from "../middleware/error-handler";
import { authenticateToken } from "./auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string; email: string; firstName: string; lastName: string; };
  db: Pool;
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["web", "mobile", "ui", "backend", "other"]).optional().default("web"),
  technologies: z.array(z.string()).optional().default([]),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional().default(false),
});

// Get all projects for user
router.get('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  
  try {
    const result = await req.db.query(
      `SELECT * FROM portfolio_projects 
       WHERE user_id = $1 
       ORDER BY is_featured DESC, created_at DESC`,
      [userId]
    );

    res.json({
      success: true,
      projects: result.rows.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        technologies: project.technologies,
        liveUrl: project.live_url,
        githubUrl: project.github_url,
        imageUrl: project.image_url,
        isFeatured: project.is_featured,
        viewCount: project.view_count,
        likeCount: project.like_count,
        createdAt: project.created_at,
        updatedAt: project.updated_at,
      })),
    });
  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Create new project
router.post('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const validation = projectSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid project data', validation.error.errors);
  }

  const data = validation.data;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      `INSERT INTO portfolio_projects 
       (user_id, title, description, category, technologies, live_url, github_url, image_url, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        userId, data.title, data.description, data.category,
        JSON.stringify(data.technologies), data.liveUrl, data.githubUrl,
        data.imageUrl, data.isFeatured
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: result.rows[0],
    });
  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

export { router as portfolioRoutes };
