import express, { Express } from "express";
import { pinoHttp } from "pino-http";

import { Env } from "#config/env.js";
import { createLogger, LoggingContext } from "#config/logging.js";
import { HealthController } from "#controllers/health.controller.js";
import { PrismaClient } from "#generated/prisma/client.js";
import { errorMiddleware } from "#middlewares/error.middleware.js";
import { createHealthRouter } from "#routes/health.routes.js";
import { CreateHealthCheckUseCase } from "#shared/domain/usecase/create-health-check.usecase.js";
import { GetHealthCheckUseCase } from "#shared/domain/usecase/get-health-check.usecase.js";
import { ListHealthCheckUseCase } from "#shared/domain/usecase/list-health-check.usecase.js";
import { makePrismaClient } from "#shared/infrastructure/persistence/prisma-client.js";
import { PrismaHealthCheckRepository } from "#shared/infrastructure/persistence/prisma-health-check.repository.js";

export function configureApplication(app: Express, loggingContext: LoggingContext) {
  app.use(express.json());
  app.use(pinoHttp({ logger: loggingContext.rawLogger }));
}

export function createApplication(env: Env) {
  const prisma = makePrismaClient(env.DATABASE_URL);
  const loggingContext = createLogger(env);

  const app = express();

  configureApplication(app, loggingContext);

  app.use("/health", createHealthModule(prisma, loggingContext));

  app.use(errorMiddleware);

  return app;
}

export function createHealthModule(prisma: PrismaClient, loggingContext: LoggingContext) {
  const repository = new PrismaHealthCheckRepository(prisma);

  const createHealthCheckUseCase = new CreateHealthCheckUseCase(repository, loggingContext.logger);

  const getHealthCheckUseCase = new GetHealthCheckUseCase(repository, loggingContext.logger);

  const listHealthCheckUseCase = new ListHealthCheckUseCase(repository);

  const controller = new HealthController(
    createHealthCheckUseCase,
    getHealthCheckUseCase,
    listHealthCheckUseCase,
  );

  return createHealthRouter(controller);
}
