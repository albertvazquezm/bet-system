import { Request, Response, NextFunction } from 'express';
import { logService } from '../modules/common/log.service';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logService.log({
      level: 'info',
      message: `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`,
      meta: {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
    });
  });

  next();
}; 