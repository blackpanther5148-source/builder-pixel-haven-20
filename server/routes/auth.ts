import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { z } from "zod";
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  asyncHandler,
  handleDatabaseError,
} from "../middleware/error-handler";

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  location: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  professionalSummary: z.string().max(1000).optional(),
});

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  db: Pool;
}

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Middleware to verify JWT token
const authenticateToken = asyncHandler(
  async (req: AuthRequest, res: Response, next: Function) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new AuthenticationError("Access token required");
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // Get user from database
      const result = await req.db.query(
        "SELECT id, email, first_name, last_name FROM users WHERE id = $1",
        [decoded.userId],
      );

      if (result.rows.length === 0) {
        throw new AuthenticationError("Invalid token");
      }

      req.user = {
        id: result.rows[0].id,
        email: result.rows[0].email,
        firstName: result.rows[0].first_name,
        lastName: result.rows[0].last_name,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError("Invalid token");
      }
      throw error;
    }
  },
);

// Generate JWT token
function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Register user
router.post(
  "/register",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Invalid input data", validation.error.errors);
    }

    const { email, password, firstName, lastName, phone, location } =
      validation.data;

    try {
      // Check if user already exists
      const existingUser = await req.db.query(
        "SELECT id FROM users WHERE email = $1",
        [email],
      );

      if (existingUser.rows.length > 0) {
        throw new ValidationError("User with this email already exists");
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user
      const result = await req.db.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, phone, location)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, created_at`,
        [email, passwordHash, firstName, lastName, phone, location],
      );

      const user = result.rows[0];
      const token = generateToken(user.id);

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
        [
          user.id,
          "user_registered",
          { method: "email" },
          req.ip,
          req.get("User-Agent"),
        ],
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          createdAt: user.created_at,
        },
        token,
      });
    } catch (error: any) {
      if (error.code === "23505") {
        // Unique violation
        throw new ValidationError("User with this email already exists");
      }
      throw handleDatabaseError(error);
    }
  }),
);

// Login user
router.post(
  "/login",
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Invalid input data", validation.error.errors);
    }

    const { email, password } = validation.data;

    try {
      // Get user with password hash
      const result = await req.db.query(
        `SELECT id, email, password_hash, first_name, last_name, subscription_tier
       FROM users WHERE email = $1`,
        [email],
      );

      if (result.rows.length === 0) {
        throw new AuthenticationError("Invalid email or password");
      }

      const user = result.rows[0];

      // Verify password
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        throw new AuthenticationError("Invalid email or password");
      }

      const token = generateToken(user.id);

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
        [
          user.id,
          "user_login",
          { method: "email" },
          req.ip,
          req.get("User-Agent"),
        ],
      );

      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          subscriptionTier: user.subscription_tier,
        },
        token,
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Get current user profile
router.get(
  "/profile",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    try {
      const result = await req.db.query(
        `SELECT id, email, first_name, last_name, phone, location, website, 
              linkedin_url, github_url, professional_summary, profile_picture_url,
              subscription_tier, created_at, updated_at
       FROM users WHERE id = $1`,
        [req.user!.id],
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("User not found");
      }

      const user = result.rows[0];

      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          location: user.location,
          website: user.website,
          linkedinUrl: user.linkedin_url,
          githubUrl: user.github_url,
          professionalSummary: user.professional_summary,
          profilePictureUrl: user.profile_picture_url,
          subscriptionTier: user.subscription_tier,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Update user profile
router.put(
  "/profile",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const validation = updateProfileSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError("Invalid input data", validation.error.errors);
    }

    const data = validation.data;
    const userId = req.user!.id;

    try {
      // Build dynamic query
      const updateFields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          const dbField = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          updateFields.push(`${dbField} = $${paramCount}`);
          values.push(value);
          paramCount++;
        }
      }

      if (updateFields.length === 0) {
        throw new ValidationError("No fields to update");
      }

      updateFields.push(`updated_at = $${paramCount}`);
      values.push(new Date());
      values.push(userId);

      const query = `
      UPDATE users 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING id, email, first_name, last_name, phone, location, website,
                linkedin_url, github_url, professional_summary, updated_at
    `;

      const result = await req.db.query(query, values);

      if (result.rows.length === 0) {
        throw new NotFoundError("User not found");
      }

      const user = result.rows[0];

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
        [userId, "profile_updated", { fields: Object.keys(data) }],
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          location: user.location,
          website: user.website,
          linkedinUrl: user.linkedin_url,
          githubUrl: user.github_url,
          professionalSummary: user.professional_summary,
          updatedAt: user.updated_at,
        },
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Change password
router.put(
  "/password",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new ValidationError(
        "Current password and new password are required",
      );
    }

    if (newPassword.length < 8) {
      throw new ValidationError("New password must be at least 8 characters");
    }

    const userId = req.user!.id;

    try {
      // Get current password hash
      const result = await req.db.query(
        "SELECT password_hash FROM users WHERE id = $1",
        [userId],
      );

      if (result.rows.length === 0) {
        throw new NotFoundError("User not found");
      }

      // Verify current password
      const validPassword = await bcrypt.compare(
        currentPassword,
        result.rows[0].password_hash,
      );
      if (!validPassword) {
        throw new AuthenticationError("Current password is incorrect");
      }

      // Hash new password
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await req.db.query(
        "UPDATE users SET password_hash = $1, updated_at = $2 WHERE id = $3",
        [newPasswordHash, new Date(), userId],
      );

      // Log analytics event
      await req.db.query(
        `INSERT INTO user_analytics (user_id, event_type, event_data, ip_address)
       VALUES ($1, $2, $3, $4)`,
        [userId, "password_changed", {}, req.ip],
      );

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error: any) {
      throw handleDatabaseError(error);
    }
  }),
);

// Logout (client-side token removal)
router.post(
  "/logout",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    // Log analytics event
    await req.db.query(
      `INSERT INTO user_analytics (user_id, event_type, event_data, ip_address)
     VALUES ($1, $2, $3, $4)`,
      [userId, "user_logout", {}, req.ip],
    );

    res.json({
      success: true,
      message: "Logout successful",
    });
  }),
);

// Verify token endpoint
router.get(
  "/verify",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    res.json({
      success: true,
      user: req.user,
    });
  }),
);

export { router as authRoutes, authenticateToken };
