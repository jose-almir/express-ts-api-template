import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { describe, expect, it } from "vitest";

describe.todo("Postgres container", () => {
  it("should start a postgres container", async () => {
    const container = await new PostgreSqlContainer("postgres:latest").start();

    expect(container.getDatabase()).toBeDefined();

    await container.stop();
  });
});
