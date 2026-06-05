import { Router } from "express";

import {
  HealthController,
  HealthDetailsParamsSchema,
  HealthNewCheckBodySchema,
  HealthQuerySchema,
} from "#controllers/health.controller.js";
import { validate } from "#middlewares/validate.middleware.js";
import { CreateHealthCheckUseCase } from "#shared/domain/usecase/create-health-check.usecase.js";
import { GetHealthCheckUseCase } from "#shared/domain/usecase/get-health-check.usecase.js";
import { ListHealthCheckUseCase } from "#shared/domain/usecase/list-health-check.usecase.js";
import { PrismaHealthCheckRepository } from "#shared/infrastructure/persistence/prisma-health-check.repository.js";

export const healthRouter = Router();
const createHealthCheckUseCase = new CreateHealthCheckUseCase(new PrismaHealthCheckRepository());
const getHealthCheckUseCase = new GetHealthCheckUseCase(new PrismaHealthCheckRepository());
const listHealthCheckUseCase = new ListHealthCheckUseCase(new PrismaHealthCheckRepository());
const healthController = new HealthController(
  createHealthCheckUseCase,
  getHealthCheckUseCase,
  listHealthCheckUseCase,
);

healthRouter.get(
  "/",
  validate({ query: HealthQuerySchema }),
  healthController.handleIndex.bind(healthController),
);

healthRouter.get(
  "/:checkId",
  validate({ params: HealthDetailsParamsSchema }),
  healthController.handleDetails.bind(healthController),
);

healthRouter.post(
  "/",
  validate({ body: HealthNewCheckBodySchema }),
  healthController.handleNewCheck.bind(healthController),
);
