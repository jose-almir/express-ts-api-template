import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { createApplication } from "#app.js";
import { loadEnv } from "#config/env.js";
import { makePrismaClient } from "#shared/infrastructure/persistence/prisma-client.js";

describe("Create Health Check", () => {
  const env = loadEnv();

  it("should create a health check", async () => {
    const app = createApplication(env);

    const response = await request(app).post("/health").send({
      interval: 60,
      name: "Google",
      url: "https://google.com",
    });
    expect(response.status).toBe(201);
  });

  beforeEach(async () => {
    const prisma = makePrismaClient(env.DATABASE_URL);
    await prisma.healthCheck.deleteMany();
  });
});
