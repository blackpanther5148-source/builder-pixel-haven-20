import express, { Request, Response } from "express";
import { Pool } from "pg";
import { z } from "zod";
import { 
  ValidationError, 
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

// Validation schema
const jobMatchSchema = z.object({
  jobUrl: z.string().url().optional(),
  jobDescription: z.string().min(10, "Job description is required"),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  resumeId: z.string().uuid().optional(),
});

// Mock AI job matching analysis
async function analyzeJobMatch(data: {
  resumeContent?: any;
  jobDescription: string;
  jobTitle?: string;
  companyName?: string;
}): Promise<{
  overallMatch: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  matchedSkills: any[];
  missingSkills: any[];
  suggestions: any[];
  salaryInsights: any;
}> {
  // Mock analysis results - in production this would use real AI
  const mockResults = {
    overallMatch: Math.floor(Math.random() * 20) + 80, // 80-100
    skillsMatch: Math.floor(Math.random() * 15) + 85,   // 85-100
    experienceMatch: Math.floor(Math.random() * 25) + 75, // 75-100
    educationMatch: Math.floor(Math.random() * 10) + 90,   // 90-100
    
    matchedSkills: [
      { skill: "React", level: "Expert", match: 100, required: true },
      { skill: "TypeScript", level: "Advanced", match: 95, required: true },
      { skill: "JavaScript", level: "Expert", match: 100, required: true },
      { skill: "Node.js", level: "Advanced", match: 90, required: false },
      { skill: "CSS", level: "Advanced", match: 95, required: true },
    ],
    
    missingSkills: [
      { skill: "Next.js", importance: "Preferred", impact: "Medium" },
      { skill: "GraphQL", importance: "Nice to have", impact: "Low" },
      { skill: "Docker", importance: "Preferred", impact: "Low" },
    ],
    
    suggestions: [
      {
        category: "Skills",
        priority: "High",
        suggestion: "Consider adding Next.js experience to your resume",
        action: "Take a Next.js course or build a project"
      },
      {
        category: "Keywords",
        priority: "High", 
        suggestion: "Include more keywords from the job description",
        action: "Update resume with relevant terms"
      },
      {
        category: "Experience",
        priority: "Medium",
        suggestion: "Highlight team leadership experience",
        action: "Add leadership examples to work history"
      },
    ],
    
    salaryInsights: {
      yourRange: "$120,000 - $140,000",
      jobRange: "$130,000 - $160,000", 
      marketAverage: "$145,000",
      competitiveness: "Competitive"
    }
  };

  return mockResults;
}

// Analyze job match
router.post('/analyze', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const validation = jobMatchSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid job match data', validation.error.errors);
  }

  const { jobUrl, jobDescription, companyName, jobTitle, resumeId } = validation.data;
  const userId = req.user!.id;

  try {
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

    // Perform AI analysis
    const analysis = await analyzeJobMatch({
      resumeContent,
      jobDescription,
      jobTitle,
      companyName,
    });

    // Save analysis to database
    const result = await req.db.query(
      `INSERT INTO job_match_analyses 
       (user_id, resume_id, job_url, job_description, company_name, job_title,
        overall_match_score, skills_match_score, experience_match_score, education_match_score,
        matched_skills, missing_skills, suggestions, salary_insights)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING id, created_at`,
      [
        userId,
        resumeId || null,
        jobUrl || null,
        jobDescription,
        companyName || null,
        jobTitle || null,
        analysis.overallMatch,
        analysis.skillsMatch,
        analysis.experienceMatch,
        analysis.educationMatch,
        JSON.stringify(analysis.matchedSkills),
        JSON.stringify(analysis.missingSkills),
        JSON.stringify(analysis.suggestions),
        JSON.stringify(analysis.salaryInsights)
      ]
    );

    const analysisId = result.rows[0].id;

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'job_match_analyzed',
        { 
          analysisId,
          overallMatch: analysis.overallMatch,
          companyName,
          jobTitle,
          hasResume: !!resumeId
        }
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Job match analysis completed',
      analysis: {
        id: analysisId,
        overallMatch: analysis.overallMatch,
        skillsMatch: analysis.skillsMatch,
        experienceMatch: analysis.experienceMatch,
        educationMatch: analysis.educationMatch,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        suggestions: analysis.suggestions,
        salaryInsights: analysis.salaryInsights,
        createdAt: result.rows[0].created_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Get user's job match history
router.get('/history', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await req.db.query(
      `SELECT jma.id, jma.job_title, jma.company_name, jma.overall_match_score,
              jma.created_at, r.title as resume_title
       FROM job_match_analyses jma
       LEFT JOIN resumes r ON jma.resume_id = r.id
       WHERE jma.user_id = $1
       ORDER BY jma.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await req.db.query(
      'SELECT COUNT(*) FROM job_match_analyses WHERE user_id = $1',
      [userId]
    );

    res.json({
      success: true,
      analyses: result.rows.map(analysis => ({
        id: analysis.id,
        jobTitle: analysis.job_title,
        companyName: analysis.company_name,
        overallMatch: analysis.overall_match_score,
        resumeTitle: analysis.resume_title,
        createdAt: analysis.created_at,
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

// Get specific job match analysis
router.get('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const analysisId = req.params.id;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      `SELECT jma.*, r.title as resume_title
       FROM job_match_analyses jma
       LEFT JOIN resumes r ON jma.resume_id = r.id
       WHERE jma.id = $1 AND jma.user_id = $2`,
      [analysisId, userId]
    );

    if (result.rows.length === 0) {
      throw new ValidationError('Job match analysis not found');
    }

    const analysis = result.rows[0];

    res.json({
      success: true,
      analysis: {
        id: analysis.id,
        jobUrl: analysis.job_url,
        jobDescription: analysis.job_description,
        companyName: analysis.company_name,
        jobTitle: analysis.job_title,
        overallMatch: analysis.overall_match_score,
        skillsMatch: analysis.skills_match_score,
        experienceMatch: analysis.experience_match_score,
        educationMatch: analysis.education_match_score,
        matchedSkills: analysis.matched_skills,
        missingSkills: analysis.missing_skills,
        suggestions: analysis.suggestions,
        salaryInsights: analysis.salary_insights,
        resumeTitle: analysis.resume_title,
        createdAt: analysis.created_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

export { router as jobMatchRoutes };
