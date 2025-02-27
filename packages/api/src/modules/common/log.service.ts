import winston, { LogEntry } from 'winston';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

// Simple logger service abstraction over winston.Logger
export class LogService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }

  log(entry: LogEntry) {
    this.logger.log(entry);
  }
}

export const logService = new LogService();