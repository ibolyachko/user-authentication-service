import { z } from 'zod';

export const configEnvSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  DB_HOST: z.coerce.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.coerce.string(),
  DB_PASSWORD: z.coerce.string(),
  DB_NAME: z.coerce.string(),
  REDIS_HOST: z.coerce.string(),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  JWT_SECRET: z.coerce.string(),
  JWT_EXPIRES: z.coerce.string(),
});
export type ConfigEnv = z.infer<typeof configEnvSchema>;
