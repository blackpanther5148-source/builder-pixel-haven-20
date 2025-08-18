import { Request, Response, NextFunction } from "express";
import * as Sentry from "@sentry/node";

interface ErrorResponse {
  error: string;
  message?: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
  details?: any;
}

// Custom error classes
export class ValidationError extends Error {
  statusCode = 400;
  isOperational = true;
  
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  statusCode = 401;
  isOperational = true;
  
  constructor(message: string = 'Authentication required') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends Error {
  statusCode = 403;
  isOperational = true;
  
  constructor(message: string = 'Access denied') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends Error {
  statusCode = 404;
  isOperational = true;
  
  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends Error {
  statusCode = 500;
  isOperational = true;
  
  constructor(message: string, public details?: any) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class ExternalServiceError extends Error {
  statusCode = 503;
  isOperational = true;
  
  constructor(service: string, message?: string) {
    super(message || `External service ${service} is unavailable`);
    this.name = 'ExternalServiceError';
  }
}

// Main error handler middleware
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Generate request ID for tracking
  const requestId = req.headers['x-request-id'] || 
                   `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Set default error properties
  const statusCode = error.statusCode || 500;
  const isOperational = error.isOperational || false;

  // Log error details
  const errorLog = {
    message: error.message,
    stack: error.stack,
    statusCode,
    isOperational,
    requestId,
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    timestamp: new Date().toISOString(),
    userId: (req as any).user?.id,
    details: error.details
  };

  // Log based on severity
  if (statusCode >= 500) {
    console.error('Server Error:', errorLog);
    
    // Report to Sentry for server errors
    if (process.env.SENTRY_DSN) {
      Sentry.withScope((scope) => {
        scope.setTag('component', 'api');
        scope.setLevel('error');
        scope.setContext('request', {
          url: req.url,
          method: req.method,
          headers: req.headers,
          requestId
        });
        
        if ((req as any).user) {
          scope.setUser({
            id: (req as any).user.id,
            email: (req as any).user.email
          });
        }
        
        Sentry.captureException(error);
      });
    }
  } else if (statusCode >= 400) {
    console.warn('Client Error:', errorLog);
  }

  // Prepare response
  const errorResponse: ErrorResponse = {
    error: getErrorType(error),
    message: isOperational ? error.message : 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    requestId: requestId as string
  };

  // Include details for client errors in development
  if (process.env.NODE_ENV === 'development' && statusCode < 500) {
    errorResponse.details = error.details;
  }

  // Include stack trace in development for server errors
  if (process.env.NODE_ENV === 'development' && statusCode >= 500) {
    (errorResponse as any).stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

// Get user-friendly error type
function getErrorType(error: AppError): string {
  switch (error.name) {
    case 'ValidationError':
      return 'Validation Error';
    case 'AuthenticationError':
      return 'Authentication Error';
    case 'AuthorizationError':
      return 'Authorization Error';
    case 'NotFoundError':
      return 'Not Found';
    case 'DatabaseError':
      return 'Database Error';
    case 'ExternalServiceError':
      return 'Service Unavailable';
    default:
      return error.statusCode && error.statusCode < 500 ? 'Client Error' : 'Server Error';
  }
}

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Database error handler
export const handleDatabaseError = (error: any): AppError => {
  const dbError = new DatabaseError('Database operation failed');
  
  // Parse PostgreSQL errors
  if (error.code) {
    switch (error.code) {
      case '23505': // Unique violation
        dbError.message = 'Resource already exists';
        dbError.statusCode = 409;
        break;
      case '23503': // Foreign key violation
        dbError.message = 'Referenced resource does not exist';
        dbError.statusCode = 400;
        break;
      case '23502': // Not null violation
        dbError.message = 'Required field is missing';
        dbError.statusCode = 400;
        break;
      case '42P01': // Undefined table
        dbError.message = 'Resource not found';
        dbError.statusCode = 404;
        break;
      default:
        dbError.message = 'Database error occurred';
        dbError.statusCode = 500;
    }
  }
  
  dbError.details = {
    code: error.code,
    constraint: error.constraint,
    table: error.table,
    column: error.column
  };
  
  return dbError;
};

// File processing error handler
export const handleFileError = (error: any): AppError => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return new ValidationError('File size exceeds limit', {
      maxSize: '10MB'
    });
  }
  
  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return new ValidationError('Unexpected file field');
  }
  
  if (error.message.includes('Invalid file type')) {
    return new ValidationError('Invalid file type', {
      allowedTypes: ['PDF', 'DOC', 'DOCX']
    });
  }
  
  return new Error('File processing failed');
};

// Rate limit error handler
export const handleRateLimitError = (): AppError => {
  const error = new Error('Too many requests') as AppError;
  error.statusCode = 429;
  error.isOperational = true;
  return error;
};
