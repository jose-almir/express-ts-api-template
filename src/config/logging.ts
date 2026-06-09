import pino from "pino";

import { Env } from "#config/env.js";

export interface Logger {
  debug(message: string, metadata?: object): void;
  error(message: string, metadata?: object): void;
  fatal(message: string, metadata?: object): void;
  info(message: string, metadata?: object): void;
  warn(message: string, metadata?: object): void;
}

export type LoggerConfig = Pick<Env, "LOG_LEVEL" | "NODE_ENV">;

export interface LoggingContext {
  logger: Logger;
  rawLogger: pino.Logger;
}

export class PinoLogger implements Logger {
  constructor(private readonly logger: pino.Logger) {}

  debug(message: string, metadata?: object): void {
    this.logger.debug(metadata, message);
  }
  error(message: string, metadata?: object): void {
    this.logger.error(metadata, message);
  }
  fatal(message: string, metadata?: object): void {
    this.logger.fatal(metadata, message);
  }
  info(message: string, metadata?: object): void {
    this.logger.info(metadata, message);
  }
  warn(message: string, metadata?: object): void {
    this.logger.warn(metadata, message);
  }
}

export function createLogger(config: LoggerConfig): LoggingContext {
  const pinoLogger = pino({
    base: {
      app: "my-api",
      env: config.NODE_ENV,
      version: "1.0.0",
    },
    level: config.LOG_LEVEL,
    transport:
      config.NODE_ENV !== "production"
        ? {
            options: {
              colorize: true,
              ignore: "pid,hostname",
              translateTime: "SYS:standard",
            },
            target: "pino-pretty",
          }
        : undefined,
  });
  return {
    logger: new PinoLogger(pinoLogger),
    rawLogger: pinoLogger,
  };
}
