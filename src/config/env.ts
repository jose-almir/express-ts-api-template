import z from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
});

export type Env = ReturnType<typeof loadEnv>;

export function loadEnv() {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid environment variables:", z.treeifyError(result.error));
    process.exit(1);
  }
  return result.data;
}
