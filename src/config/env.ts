import z from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
});

export const env = EnvSchema.parse(process.env);
