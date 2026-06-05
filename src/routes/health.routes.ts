import { Router } from "express";

import {
  HealthController,
  HealthDetailsParamsSchema,
  HealthNewCheckBodySchema,
  HealthQuerySchema,
} from "#controllers/health.controller.js";
import { validate } from "#middlewares/validate.middleware.js";

export function createHealthRouter(controller: HealthController) {
  const router = Router();

  router.get("/", validate({ query: HealthQuerySchema }), controller.handleIndex.bind(controller));

  router.get(
    "/:checkId",
    validate({ params: HealthDetailsParamsSchema }),
    controller.handleDetails.bind(controller),
  );

  router.post(
    "/",
    validate({ body: HealthNewCheckBodySchema }),
    controller.handleNewCheck.bind(controller),
  );

  return router;
}
