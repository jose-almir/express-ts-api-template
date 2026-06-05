import express from "express";

import { HealthController } from "#controllers/health.controller.js";
import { PrismaClient } from "#generated/prisma/client.js";
import { createHealthRouter } from "#routes/health.routes.js";
import { CreateHealthCheckUseCase } from "#shared/domain/usecase/create-health-check.usecase.js";
import { GetHealthCheckUseCase } from "#shared/domain/usecase/get-health-check.usecase.js";
import { ListHealthCheckUseCase } from "#shared/domain/usecase/list-health-check.usecase.js";
import { PrismaHealthCheckRepository } from "#shared/infrastructure/persistence/prisma-health-check.repository.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

export function createApplication(prisma: PrismaClient) {
  const repository = new PrismaHealthCheckRepository(prisma);

  const createHealthCheckUseCase = new CreateHealthCheckUseCase(repository);

  const getHealthCheckUseCase = new GetHealthCheckUseCase(repository);

  const listHealthCheckUseCase = new ListHealthCheckUseCase(repository);

  const controller = new HealthController(
    createHealthCheckUseCase,
    getHealthCheckUseCase,
    listHealthCheckUseCase,
  );

  const app = express();

  app.use(express.json());

  app.use("/health", createHealthRouter(controller));

  app.use(errorMiddleware);

  return app;
}
