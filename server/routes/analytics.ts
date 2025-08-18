import express, { Request, Response } from "express";
import { Pool } from "pg";
import { asyncHandler, handleDatabaseError } from "../middleware/error-handler";
import { authenticateToken } from "./auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: { id: string; email: string; firstName: string; lastName: string };
  db: Pool;
}

// Get user analytics dashboard
router.get(
  "/dashboard",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      // Get various analytics in parallel
      const [resumeStats, applicationStats, activityStats] = await Promise.all([
        req.db.query(
          `SELECT COUNT(*) as total_resumes, 
                AVG(optimization_score) as avg_optimization_score,
                SUM(download_count) as total_downloads
         FROM resumes WHERE user_id = $1`,
          [userId],
        ),
        req.db.query(
          `SELECT COUNT(*) as total_applications,
                COUNT(CASE WHEN status = 'interview' THEN 1 END) as interviews,
                COUNT(CASE WHEN status = 'offer' THEN 1 END) as offers
         FROM job_applications WHERE user_id = $1`,
          [userId],
        ),
        req.db.query(
          `SELECT event_type, COUNT(*) as count
         FROM user_analytics 
         WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'
         GROUP BY event_type
         ORDER BY count DESC`,
          [userId],
        ),
      ]);

      res.json({
        success: true,
        analytics: {
          resumes: {
            total: parseInt(resumeStats.rows[0].total_resumes),
            avgOptimizationScore:
              parseFloat(resumeStats.rows[0].avg_optimization_score) || 0,
            totalDownloads: parseInt(resumeStats.rows[0].total_downloads) || 0,
          },
          applications: {
            total: parseInt(applicationStats.rows[0].total_applications),
            interviews: parseInt(applicationStats.rows[0].interviews),
            offers: parseInt(applicationStats.rows[0].offers),
          },
          activity: activityStats.rows,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

export { router as analyticsRoutes };
