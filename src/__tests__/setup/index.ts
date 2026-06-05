import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "node:child_process";

export default async function () {
  const container = await new PostgreSqlContainer("postgres:latest").start();

  process.env.DATABASE_URL = container.getConnectionUri();

  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
  });

  return async () => {
    await container.stop();
  };
}
