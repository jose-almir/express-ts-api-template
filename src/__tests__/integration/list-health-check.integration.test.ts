import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { createApplication } from "#app.js";
import { loadEnv } from "#config/env.js";
import { makePrismaClient } from "#shared/infrastructure/persistence/prisma-client.js";

describe("List Health Checks", () => {
  const env = loadEnv();

  it("should list all health checks", async () => {
    const app = createApplication(env);

    // Create a health check to ensure there's at least one record
    await request(app).post("/health").send({
      interval: 60,
      name: "Google",
      url: "https://google.com",
    });

    const response = await request(app).get("/health").send();

    expect(response.status).toBe(200);
    console.log(response.body);
  });

  beforeEach(async () => {
    const prisma = makePrismaClient(env.DATABASE_URL);
    await prisma.healthCheck.deleteMany();
  });
});
