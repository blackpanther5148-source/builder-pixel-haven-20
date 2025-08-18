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
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  db: Pool;
}

// Validation schemas
const coverLetterSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().optional(),
  resumeId: z.string().uuid().optional(),
  templateStyle: z.enum(["professional", "creative", "casual"]).optional().default("professional"),
});

// AI cover letter generation (mock implementation)
async function generateCoverLetter(data: {
  userInfo: any;
  resumeContent?: any;
  companyName: string;
  jobTitle: string;
  jobDescription?: string;
  templateStyle: string;
}): Promise<string> {
  const { userInfo, companyName, jobTitle, templateStyle } = data;
  
  // Mock AI-generated cover letter
  const coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in software development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my previous roles, I have developed expertise in modern web technologies and have successfully delivered multiple projects that improved user experience and system performance. My experience aligns well with the requirements for this position.

What particularly attracts me to ${companyName} is your commitment to innovation and the impact your products have on users worldwide. I am eager to bring my technical skills and creative problem-solving approach to help drive your mission forward.

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${companyName}'s continued success. Thank you for considering my application.

Sincerely,
${userInfo.firstName} ${userInfo.lastName}`;

  return coverLetter;
}

// Get all cover letters for user
router.get('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await req.db.query(
      `SELECT cl.id, cl.company_name, cl.job_title, cl.template_style, 
              cl.is_generated_by_ai, cl.created_at, cl.updated_at,
              r.title as resume_title
       FROM cover_letters cl
       LEFT JOIN resumes r ON cl.resume_id = r.id
       WHERE cl.user_id = $1 
       ORDER BY cl.updated_at DESC 
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await req.db.query(
      'SELECT COUNT(*) FROM cover_letters WHERE user_id = $1',
      [userId]
    );

    res.json({
      success: true,
      coverLetters: result.rows.map(letter => ({
        id: letter.id,
        companyName: letter.company_name,
        jobTitle: letter.job_title,
        templateStyle: letter.template_style,
        isGeneratedByAI: letter.is_generated_by_ai,
        resumeTitle: letter.resume_title,
        createdAt: letter.created_at,
        updatedAt: letter.updated_at,
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
}));

// Get specific cover letter
router.get('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const letterId = req.params.id;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      `SELECT cl.*, r.title as resume_title
       FROM cover_letters cl
       LEFT JOIN resumes r ON cl.resume_id = r.id
       WHERE cl.id = $1 AND cl.user_id = $2`,
      [letterId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Cover letter not found');
    }

    const letter = result.rows[0];

    res.json({
      success: true,
      coverLetter: {
        id: letter.id,
        companyName: letter.company_name,
        jobTitle: letter.job_title,
        jobDescription: letter.job_description,
        content: letter.content,
        templateStyle: letter.template_style,
        isGeneratedByAI: letter.is_generated_by_ai,
        resumeId: letter.resume_id,
        resumeTitle: letter.resume_title,
        createdAt: letter.created_at,
        updatedAt: letter.updated_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Generate new cover letter
router.post('/generate', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const validation = coverLetterSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid cover letter data', validation.error.errors);
  }

  const { companyName, jobTitle, jobDescription, resumeId, templateStyle } = validation.data;
  const userId = req.user!.id;

  try {
    // Get user info
    const userResult = await req.db.query(
      'SELECT first_name, last_name, email FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new NotFoundError('User not found');
    }

    const userInfo = userResult.rows[0];

    // Get resume content if resumeId provided
    let resumeContent = null;
    if (resumeId) {
      const resumeResult = await req.db.query(
        'SELECT content FROM resumes WHERE id = $1 AND user_id = $2',
        [resumeId, userId]
      );
      
      if (resumeResult.rows.length > 0) {
        resumeContent = resumeResult.rows[0].content;
      }
    }

    // Generate cover letter with AI
    const generatedContent = await generateCoverLetter({
      userInfo,
      resumeContent,
      companyName,
      jobTitle,
      jobDescription,
      templateStyle: templateStyle!,
    });

    // Save cover letter
    const result = await req.db.query(
      `INSERT INTO cover_letters 
       (user_id, resume_id, company_name, job_title, job_description, content, template_style, is_generated_by_ai)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, created_at`,
      [
        userId,
        resumeId || null,
        companyName,
        jobTitle,
        jobDescription || null,
        generatedContent,
        templateStyle,
        true
      ]
    );

    const letterId = result.rows[0].id;

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'cover_letter_generated',
        { 
          letterId,
          companyName,
          jobTitle,
          templateStyle,
          hasResume: !!resumeId
        }
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Cover letter generated successfully',
      coverLetter: {
        id: letterId,
        companyName,
        jobTitle,
        content: generatedContent,
        templateStyle,
        createdAt: result.rows[0].created_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Update cover letter
router.put('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const letterId = req.params.id;
  const userId = req.user!.id;
  const { content, companyName, jobTitle, jobDescription, templateStyle } = req.body;

  if (!content) {
    throw new ValidationError('Content is required');
  }

  try {
    const result = await req.db.query(
      `UPDATE cover_letters 
       SET content = $1, company_name = COALESCE($2, company_name), 
           job_title = COALESCE($3, job_title), job_description = $4,
           template_style = COALESCE($5, template_style), updated_at = $6
       WHERE id = $7 AND user_id = $8
       RETURNING id, company_name, job_title, content, template_style, updated_at`,
      [
        content,
        companyName,
        jobTitle,
        jobDescription,
        templateStyle,
        new Date(),
        letterId,
        userId
      ]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Cover letter not found');
    }

    const letter = result.rows[0];

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [userId, 'cover_letter_updated', { letterId }]
    );

    res.json({
      success: true,
      message: 'Cover letter updated successfully',
      coverLetter: {
        id: letter.id,
        companyName: letter.company_name,
        jobTitle: letter.job_title,
        content: letter.content,
        templateStyle: letter.template_style,
        updatedAt: letter.updated_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Delete cover letter
router.delete('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const letterId = req.params.id;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      'DELETE FROM cover_letters WHERE id = $1 AND user_id = $2 RETURNING id',
      [letterId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Cover letter not found');
    }

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [userId, 'cover_letter_deleted', { letterId }]
    );

    res.json({
      success: true,
      message: 'Cover letter deleted successfully',
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

export { router as coverLetterRoutes };
