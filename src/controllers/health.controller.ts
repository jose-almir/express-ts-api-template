import { Request, Response } from "express";
import { z } from "zod";

import { CreateHealthCheckUseCase } from "#shared/domain/usecase/create-health-check.usecase.js";
import { GetHealthCheckUseCase } from "#shared/domain/usecase/get-health-check.usecase.js";
import { ListHealthCheckUseCase } from "#shared/domain/usecase/list-health-check.usecase.js";

export class HealthController {
  constructor(
    private readonly createHealthCheckUseCase: CreateHealthCheckUseCase,
    private readonly getHealthCheckUseCase: GetHealthCheckUseCase,
    private readonly listHealthCheckUseCase: ListHealthCheckUseCase,
  ) {}

  async handleDetails(req: Request, res: Response) {
    const params = req.validated.params as HealthDetailsParams;

    const record = await this.getHealthCheckUseCase.execute({ id: params.checkId });

    return res.status(200).json({
      data: record,
      status: "ok",
    });
  }

  async handleIndex(req: Request, res: Response) {
    const query = req.validated.query as HealthQuery;

    const records = await this.listHealthCheckUseCase.execute(query);
    return res.status(200).json({ data: records, status: "ok" });
  }

  async handleNewCheck(req: Request, res: Response) {
    const body = req.validated.body as HealthNewCheckBody;

    // We can create a middleware later to extract the token and validate it.
    // const authHeader = req.headers.authorization;

    // console.log("Authorization header:", authHeader);

    // console.log("Creating new health check:", body);

    await this.createHealthCheckUseCase.execute(body);
    return res.status(201).json({ status: "new check created" });
  }
}

// For a better organization, we can move these schemas to a separate file like src/schemas/health.schema.ts and import them here.
// But for simplicity, I'm keeping them in the same file for now.

export const HealthQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(20),
  page: z.coerce.number().int().positive().default(1),
  search: z.string().trim().optional(),
});

export type HealthQuery = z.infer<typeof HealthQuerySchema>;

export const HealthDetailsParamsSchema = z.object({
  checkId: z.uuid(),
});

export type HealthDetailsParams = z.infer<typeof HealthDetailsParamsSchema>;

export const HealthNewCheckBodySchema = z.object({
  interval: z.coerce.number().int().positive(),
  name: z.string().trim().min(1),
  url: z.url(),
});

export type HealthNewCheckBody = z.infer<typeof HealthNewCheckBodySchema>;
