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
const resumeSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  templateId: z.string().optional().default("modern"),
  content: z.object({
    personalInfo: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      location: z.string().optional(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      summary: z.string().optional(),
    }),
    experience: z.array(z.object({
      company: z.string(),
      position: z.string(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      current: z.boolean().optional().default(false),
      description: z.string().optional(),
      achievements: z.array(z.string()).optional().default([]),
    })).optional().default([]),
    education: z.array(z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      gpa: z.string().optional(),
      honors: z.string().optional(),
    })).optional().default([]),
    skills: z.array(z.object({
      category: z.string(),
      items: z.array(z.string()),
    })).optional().default([]),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string().optional(),
      technologies: z.array(z.string()).optional().default([]),
      link: z.string().optional(),
      github: z.string().optional(),
    })).optional().default([]),
  }),
});

// AI optimization function (mock implementation)
async function optimizeResumeContent(content: any): Promise<{
  optimizedContent: any;
  suggestions: string[];
  scores: {
    overall: number;
    ats: number;
    keywords: number;
    formatting: number;
  };
}> {
  // This would integrate with AI services for real optimization
  // For now, return mock optimization results
  
  const suggestions = [
    "Consider adding more quantified achievements with specific numbers and percentages",
    "Include relevant keywords from target job descriptions",
    "Use stronger action verbs to start your bullet points",
    "Add more technical skills relevant to your field",
    "Consider expanding your professional summary"
  ];

  const scores = {
    overall: Math.floor(Math.random() * 15) + 85, // 85-100
    ats: Math.floor(Math.random() * 10) + 90,     // 90-100
    keywords: Math.floor(Math.random() * 20) + 80, // 80-100
    formatting: Math.floor(Math.random() * 8) + 92  // 92-100
  };

  // Mock content optimization
  const optimizedContent = {
    ...content,
    lastOptimized: new Date().toISOString()
  };

  return {
    optimizedContent,
    suggestions,
    scores
  };
}

// Get all resumes for user
router.get('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await req.db.query(
      `SELECT id, title, template_id, optimization_score, ats_score, 
              is_public, download_count, last_optimized_at, created_at, updated_at
       FROM resumes 
       WHERE user_id = $1 
       ORDER BY updated_at DESC 
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await req.db.query(
      'SELECT COUNT(*) FROM resumes WHERE user_id = $1',
      [userId]
    );

    res.json({
      success: true,
      resumes: result.rows.map(resume => ({
        id: resume.id,
        title: resume.title,
        templateId: resume.template_id,
        optimizationScore: resume.optimization_score,
        atsScore: resume.ats_score,
        isPublic: resume.is_public,
        downloadCount: resume.download_count,
        lastOptimizedAt: resume.last_optimized_at,
        createdAt: resume.created_at,
        updatedAt: resume.updated_at,
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

// Get specific resume
router.get('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      `SELECT id, title, template_id, content, optimization_score, ats_score,
              is_public, download_count, last_optimized_at, created_at, updated_at
       FROM resumes 
       WHERE id = $1 AND user_id = $2`,
      [resumeId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    const resume = result.rows[0];

    res.json({
      success: true,
      resume: {
        id: resume.id,
        title: resume.title,
        templateId: resume.template_id,
        content: resume.content,
        optimizationScore: resume.optimization_score,
        atsScore: resume.ats_score,
        isPublic: resume.is_public,
        downloadCount: resume.download_count,
        lastOptimizedAt: resume.last_optimized_at,
        createdAt: resume.created_at,
        updatedAt: resume.updated_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Create new resume
router.post('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const validation = resumeSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid resume data', validation.error.errors);
  }

  const { title, templateId, content } = validation.data;
  const userId = req.user!.id;

  try {
    // Optimize content with AI
    const optimization = await optimizeResumeContent(content);

    const result = await req.db.query(
      `INSERT INTO resumes (user_id, title, template_id, content, optimization_score, ats_score, last_optimized_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [
        userId,
        title,
        templateId,
        JSON.stringify(optimization.optimizedContent),
        optimization.scores.overall,
        optimization.scores.ats,
        new Date()
      ]
    );

    const resumeId = result.rows[0].id;

    // Store AI suggestions
    for (const suggestion of optimization.suggestions) {
      await req.db.query(
        `INSERT INTO ai_suggestions (user_id, content_type, content_id, suggestion_type, suggested_text, context)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          userId,
          'resume',
          resumeId,
          'optimization',
          suggestion,
          JSON.stringify({ scores: optimization.scores })
        ]
      );
    }

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'resume_created',
        { 
          resumeId,
          templateId,
          optimizationScore: optimization.scores.overall
        }
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resume: {
        id: resumeId,
        title,
        templateId,
        content: optimization.optimizedContent,
        optimizationScore: optimization.scores.overall,
        atsScore: optimization.scores.ats,
        suggestions: optimization.suggestions,
        createdAt: result.rows[0].created_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Update resume
router.put('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.user!.id;
  
  const validation = resumeSchema.partial().safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid resume data', validation.error.errors);
  }

  const updateData = validation.data;

  try {
    // Check if resume exists and belongs to user
    const existingResume = await req.db.query(
      'SELECT id, content FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );

    if (existingResume.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    let optimizationResults = null;
    let newOptimizationScore = null;
    let newAtsScore = null;

    // If content is being updated, run AI optimization
    if (updateData.content) {
      optimizationResults = await optimizeResumeContent(updateData.content);
      newOptimizationScore = optimizationResults.scores.overall;
      newAtsScore = optimizationResults.scores.ats;
      updateData.content = optimizationResults.optimizedContent;
    }

    // Build dynamic update query
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        const dbField = key === 'templateId' ? 'template_id' : key;
        updateFields.push(`${dbField} = $${paramCount}`);
        values.push(key === 'content' ? JSON.stringify(value) : value);
        paramCount++;
      }
    }

    if (newOptimizationScore) {
      updateFields.push(`optimization_score = $${paramCount}`);
      values.push(newOptimizationScore);
      paramCount++;

      updateFields.push(`ats_score = $${paramCount}`);
      values.push(newAtsScore);
      paramCount++;

      updateFields.push(`last_optimized_at = $${paramCount}`);
      values.push(new Date());
      paramCount++;
    }

    updateFields.push(`updated_at = $${paramCount}`);
    values.push(new Date());
    values.push(resumeId);
    values.push(userId);

    const query = `
      UPDATE resumes 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount + 1} AND user_id = $${paramCount + 2}
      RETURNING id, title, template_id, content, optimization_score, ats_score, updated_at
    `;

    const result = await req.db.query(query, values);

    if (result.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    const resume = result.rows[0];

    // Store new AI suggestions if content was optimized
    if (optimizationResults) {
      for (const suggestion of optimizationResults.suggestions) {
        await req.db.query(
          `INSERT INTO ai_suggestions (user_id, content_type, content_id, suggestion_type, suggested_text, context)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            userId,
            'resume',
            resumeId,
            'optimization',
            suggestion,
            JSON.stringify({ scores: optimizationResults.scores })
          ]
        );
      }
    }

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'resume_updated',
        { 
          resumeId,
          optimizationScore: resume.optimization_score,
          fieldsUpdated: Object.keys(updateData)
        }
      ]
    );

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume: {
        id: resume.id,
        title: resume.title,
        templateId: resume.template_id,
        content: resume.content,
        optimizationScore: resume.optimization_score,
        atsScore: resume.ats_score,
        suggestions: optimizationResults?.suggestions || [],
        updatedAt: resume.updated_at,
      },
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Delete resume
router.delete('/:id', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.user!.id;

  try {
    const result = await req.db.query(
      'DELETE FROM resumes WHERE id = $1 AND user_id = $2 RETURNING id, title',
      [resumeId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [userId, 'resume_deleted', { resumeId, title: result.rows[0].title }]
    );

    res.json({
      success: true,
      message: 'Resume deleted successfully',
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Get AI suggestions for resume
router.get('/:id/suggestions', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.user!.id;

  try {
    // Verify resume ownership
    const resumeCheck = await req.db.query(
      'SELECT id FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );

    if (resumeCheck.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    const result = await req.db.query(
      `SELECT id, suggestion_type, suggested_text, context, applied, created_at
       FROM ai_suggestions 
       WHERE user_id = $1 AND content_type = 'resume' AND content_id = $2
       ORDER BY created_at DESC`,
      [userId, resumeId]
    );

    res.json({
      success: true,
      suggestions: result.rows.map(suggestion => ({
        id: suggestion.id,
        type: suggestion.suggestion_type,
        text: suggestion.suggested_text,
        context: suggestion.context,
        applied: suggestion.applied,
        createdAt: suggestion.created_at,
      })),
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Download resume (generate PDF)
router.post('/download', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { resumeData, template, format } = req.body;

  if (!resumeData) {
    throw new ValidationError('Resume data is required');
  }

  try {
    // This would integrate with a PDF generation service
    // For now, we'll return a mock PDF response
    const pdfBuffer = await generatePDF(resumeData, template || 'modern');

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'resume_downloaded',
        {
          format: format || 'pdf',
          template: template || 'modern'
        }
      ]
    );

    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Download resume by ID (increment counter)
router.post('/:id/download', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const resumeId = req.params.id;
  const userId = req.user!.id;
  const format = req.body.format || 'pdf';

  try {
    // Verify resume ownership and increment download count
    const result = await req.db.query(
      `UPDATE resumes
       SET download_count = download_count + 1
       WHERE id = $1 AND user_id = $2
       RETURNING id, title, download_count`,
      [resumeId, userId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Resume not found');
    }

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [
        userId,
        'resume_downloaded',
        {
          resumeId,
          format,
          downloadCount: result.rows[0].download_count
        }
      ]
    );

    res.json({
      success: true,
      message: 'Download recorded successfully',
      downloadCount: result.rows[0].download_count,
    });

  } catch (error: any) {
    throw handleDatabaseError(error);
  }
}));

// Mock PDF generation function
async function generatePDF(resumeData: any, template: string): Promise<Buffer> {
  // This would integrate with a real PDF generation library like puppeteer, PDFKit, etc.
  // For now, we'll create a simple mock PDF buffer

  const mockPDFContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
  /Font <<
    /F1 5 0 R
  >>
>>
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 12 Tf
50 750 Td
(${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}) Tj
0 -20 Td
(${resumeData.personalInfo.email}) Tj
0 -20 Td
(Resume generated by Profyle AI) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000053 00000 n
0000000100 00000 n
0000000200 00000 n
0000000350 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
420
%%EOF`;

  return Buffer.from(mockPDFContent);
}

export { router as resumeRoutes };
