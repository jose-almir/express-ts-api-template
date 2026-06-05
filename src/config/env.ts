import z from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number(),
});

export const env = EnvSchema.parse(process.env);
