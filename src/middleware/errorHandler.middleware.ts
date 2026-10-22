import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Safe student-friendly error message, no stack traces leaked in responses
  res.status(500).json({
    success: false,
    data: null,
    error: {
      message: 'An unexpected internal service error occurred. Please refresh or try again later.',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    data: null,
    error: {
      message: `The requested endpoint "${req.originalUrl}" does not exist on this academic server.`,
      code: 'ENDPOINT_NOT_FOUND',
    },
  });
}
