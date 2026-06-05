import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { createApplication } from "#app.js";
import { loadEnv } from "#config/env.js";
import { makePrismaClient } from "#shared/infrastructure/persistence/prisma-client.js";

describe("Create Health Check", () => {
  it("should create a health check", async () => {
    const env = loadEnv();
    const prisma = makePrismaClient(env.DATABASE_URL);
    const app = createApplication(prisma);

    const response = await request(app).post("/health").send({
      interval: 60,
      name: "Google",
      url: "https://google.com",
    });
    expect(response.status).toBe(201);
  });

  beforeEach(async () => {
    const env = loadEnv();
    const prisma = makePrismaClient(env.DATABASE_URL);
    await prisma.healthCheck.deleteMany();
  });
});
