import express, { Request, Response } from "express";
import { Pool } from "pg";
import { z } from "zod";
import {
  ValidationError,
  NotFoundError,
  asyncHandler,
  handleDatabaseError,
} from "../middleware/error-handler";
import { authenticateToken } from "./auth";

const router = express.Router();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  db: Pool;
}

// Validation schemas
const jobApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobUrl: z.string().url().optional(),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z
    .enum(["applied", "interview", "offer", "rejected"])
    .optional()
    .default("applied"),
  currentStage: z.string().optional(),
  nextStep: z.string().optional(),
  nextDate: z.string().optional(), // ISO date string
  priority: z.enum(["low", "medium", "high"]).optional().default("medium"),
  notes: z.string().optional(),
  resumeId: z.string().uuid().optional(),
  coverLetterId: z.string().uuid().optional(),
});

const contactSchema = z.object({
  name: z.string().min(1, "Contact name is required"),
  role: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedinUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

// Get all job applications for user
router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const search = req.query.search as string;

    try {
      let whereClause = "WHERE ja.user_id = $1";
      const queryParams = [userId];
      let paramCount = 2;

      if (status && status !== "all") {
        whereClause += ` AND ja.status = $${paramCount}`;
        queryParams.push(status);
        paramCount++;
      }

      if (search) {
        whereClause += ` AND (ja.company_name ILIKE $${paramCount} OR ja.job_title ILIKE $${paramCount})`;
        queryParams.push(`%${search}%`);
        paramCount++;
      }

      const result = await req.db.query(
        `SELECT ja.*, r.title as resume_title, cl.company_name as cover_letter_company
       FROM job_applications ja
       LEFT JOIN resumes r ON ja.resume_id = r.id
       LEFT JOIN cover_letters cl ON ja.cover_letter_id = cl.id
       ${whereClause}
       ORDER BY ja.application_date DESC, ja.created_at DESC
       LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
        [...queryParams, limit, offset],
      );

      const countResult = await req.db.query(
        `SELECT COUNT(*) FROM job_applications ja ${whereClause}`,
        queryParams, // Use the same params as the main query, but without limit/offset
      );

      res.json({
        success: true,
        applications: result.rows.map((app) => ({
          id: app.id,
          companyName: app.company_name,
          jobTitle: app.job_title,
          jobUrl: app.job_url,
          location: app.location,
          salaryRange: app.salary_range,
          status: app.status,
          currentStage: app.current_stage,
          nextStep: app.next_step,
          nextDate: app.next_date,
          priority: app.priority,
          notes: app.notes,
          applicationDate: app.application_date,
          resumeId: app.resume_id,
          resumeTitle: app.resume_title,
          coverLetterId: app.cover_letter_id,
          createdAt: app.created_at,
          updatedAt: app.updated_at,
        })),
        pagination: {
          page,
          limit,
          total: parseInt(countResult.rows[0].count),
          pages: Math.ceil(parseInt(countResult.rows[0].count) / limit),
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Get application statistics
router.get(
  "/stats",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const result = await req.db.query(
        `SELECT 
         COUNT(*) as total_applications,
         COUNT(CASE WHEN status = 'applied' THEN 1 END) as applied_count,
         COUNT(CASE WHEN status = 'interview' THEN 1 END) as interview_count,
         COUNT(CASE WHEN status = 'offer' THEN 1 END) as offer_count,
         COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
         ROUND(AVG(CASE WHEN status != 'applied' THEN 1 ELSE 0 END) * 100, 1) as response_rate,
         ROUND(AVG(CASE WHEN status IN ('interview', 'offer') THEN 1 ELSE 0 END) * 100, 1) as interview_rate
       FROM job_applications 
       WHERE user_id = $1`,
        [userId],
      );

      const stats = result.rows[0];

      res.json({
        success: true,
        stats: {
          totalApplications: parseInt(stats.total_applications),
          appliedCount: parseInt(stats.applied_count),
          interviewCount: parseInt(stats.interview_count),
          offerCount: parseInt(stats.offer_count),
          rejectedCount: parseInt(stats.rejected_count),
          responseRate: parseFloat(stats.response_rate) || 0,
          interviewRate: parseFloat(stats.interview_rate) || 0,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Get specific job application with contacts
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const applicationId = req.params.id;
    const userId = req.user!.id;

    try {
      const appResult = await req.db.query(
        `SELECT ja.*, r.title as resume_title, cl.company_name as cover_letter_company
       FROM job_applications ja
       LEFT JOIN resumes r ON ja.resume_id = r.id
       LEFT JOIN cover_letters cl ON ja.cover_letter_id = cl.id
       WHERE ja.id = $1 AND ja.user_id = $2`,
        [applicationId, userId],
      );

      if (appResult.rows.length === 0) {
        throw new NotFoundError("Job application not found");
      }

      const contactsResult = await req.db.query(
        "SELECT * FROM job_contacts WHERE job_application_id = $1 ORDER BY created_at",
        [applicationId],
      );

      const application = appResult.rows[0];

      res.json({
        success: true,
        application: {
          id: application.id,
          companyName: application.company_name,
          jobTitle: application.job_title,
          jobUrl: application.job_url,
          location: application.location,
          salaryRange: application.salary_range,
          status: application.status,
          currentStage: application.current_stage,
          nextStep: application.next_step,
          nextDate: application.next_date,
          priority: application.priority,
          notes: application.notes,
          applicationDate: application.application_date,
          resumeId: application.resume_id,
          resumeTitle: application.resume_title,
          coverLetterId: application.cover_letter_id,
          contacts: contactsResult.rows.map((contact) => ({
            id: contact.id,
            name: contact.name,
            title: contact.title,
            email: contact.email,
            phone: contact.phone,
            linkedinUrl: contact.linkedin_url,
            notes: contact.notes,
            createdAt: contact.created_at,
          })),
          createdAt: application.created_at,
          updatedAt: application.updated_at,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Create new job application
router.post(
  "/",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validation = jobApplicationSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        "Invalid job application data",
        validation.error.errors,
      );
    }

    const data = validation.data;
    const userId = req.user!.id;

    try {
      const result = await req.db.query(
        `INSERT INTO job_applications 
       (user_id, company_name, job_title, job_url, location, salary_range, status, 
        current_stage, next_step, next_date, priority, notes, resume_id, cover_letter_id, application_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING id, created_at`,
        [
          userId,
          data.companyName,
          data.jobTitle,
          data.jobUrl || null,
          data.location || null,
          data.salaryRange || null,
          data.status,
          data.currentStage || null,
          data.nextStep || null,
          data.nextDate ? new Date(data.nextDate) : null,
          data.priority,
          data.notes || null,
          data.resumeId || null,
          data.coverLetterId || null,
          new Date(),
        ],
      );

      const applicationId = result.rows[0].id;

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
        [
          userId,
          "job_application_created",
          {
            applicationId,
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            status: data.status,
          },
        ],
      );

      res.status(201).json({
        success: true,
        message: "Job application created successfully",
        application: {
          id: applicationId,
          ...data,
          createdAt: result.rows[0].created_at,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Update job application
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const applicationId = req.params.id;
    const userId = req.user!.id;

    const validation = jobApplicationSchema.partial().safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        "Invalid job application data",
        validation.error.errors,
      );
    }

    const updateData = validation.data;

    try {
      // Build dynamic update query
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updateData)) {
        if (value !== undefined) {
          const dbField = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          updateFields.push(`${dbField} = $${paramCount}`);

          if (key === "nextDate" && value) {
            values.push(new Date(value as string));
          } else {
            values.push(value);
          }
          paramCount++;
        }
      }

      if (updateFields.length === 0) {
        throw new ValidationError("No fields to update");
      }

      updateFields.push(`updated_at = $${paramCount}`);
      values.push(new Date());
      values.push(applicationId);
      values.push(userId);

      const query = `
      UPDATE job_applications 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount + 1} AND user_id = $${paramCount + 2}
      RETURNING *
    `;

      const result = await req.db.query(query, values);

      if (result.rows.length === 0) {
        throw new NotFoundError("Job application not found");
      }

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
        [
          userId,
          "job_application_updated",
          {
            applicationId,
            fieldsUpdated: Object.keys(updateData),
          },
        ],
      );

      res.json({
        success: true,
        message: "Job application updated successfully",
        application: result.rows[0],
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Add contact to job application
router.post(
  "/:id/contacts",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const applicationId = req.params.id;
    const userId = req.user!.id;

    const validation = contactSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        "Invalid contact data",
        validation.error.errors,
      );
    }

    const contactData = validation.data;

    try {
      // Verify application ownership
      const appCheck = await req.db.query(
        "SELECT id FROM job_applications WHERE id = $1 AND user_id = $2",
        [applicationId, userId],
      );

      if (appCheck.rows.length === 0) {
        throw new NotFoundError("Job application not found");
      }

      const result = await req.db.query(
        `INSERT INTO job_contacts 
       (job_application_id, name, title, email, phone, linkedin_url, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
        [
          applicationId,
          contactData.name,
          contactData.role || null,
          contactData.email || null,
          contactData.phone || null,
          contactData.linkedinUrl || null,
          contactData.notes || null,
        ],
      );

      res.status(201).json({
        success: true,
        message: "Contact added successfully",
        contact: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          title: result.rows[0].title,
          email: result.rows[0].email,
          phone: result.rows[0].phone,
          linkedinUrl: result.rows[0].linkedin_url,
          notes: result.rows[0].notes,
          createdAt: result.rows[0].created_at,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Delete job application
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const applicationId = req.params.id;
    const userId = req.user!.id;

    try {
      const result = await req.db.query(
        "DELETE FROM job_applications WHERE id = $1 AND user_id = $2 RETURNING company_name, job_title",
        [applicationId, userId],
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("Job application not found");
      }

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
        [
          userId,
          "job_application_deleted",
          {
            applicationId,
            companyName: result.rows[0].company_name,
            jobTitle: result.rows[0].job_title,
          },
        ],
      );

      res.json({
        success: true,
        message: "Job application deleted successfully",
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

export { router as jobApplicationRoutes };
