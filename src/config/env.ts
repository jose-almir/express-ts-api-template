import z from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().default(3000),
});

export type Env = ReturnType<typeof loadEnv>;

export function loadEnv(source = process.env) {
  return EnvSchema.parse(source);
}
