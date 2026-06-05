import express from "express";

import { healthRouter } from "#routes/health.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());

app.use("/health", healthRouter);

app.use(errorMiddleware);
