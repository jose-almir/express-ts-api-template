import { Router } from "express";

import { HealthController } from "#controllers/health.controller.js";

export const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get("/", (req, res) => {
  healthController.handle(req, res);
});
