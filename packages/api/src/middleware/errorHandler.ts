import { logService, LogLevel } from '../modules/common/log.service';
import { Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import { ZodError } from 'zod';


export const errorHandler = (
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logService.log({
    level: LogLevel.ERROR,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    statusCode: res.statusCode,
    error: err,
  });
  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}; 