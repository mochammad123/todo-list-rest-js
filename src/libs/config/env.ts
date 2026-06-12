import dotenv from "dotenv";
import z from "zod";

dotenv.config({ path: ".env", override: true });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().transform(Number).default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("1d"),
  REDIS_HOST: z.string().default("127.0.0.1"),
  REDIS_PORT: z.string().transform(Number).default(6379),
  REDIS_TTL_SECONDS: z.string().transform(Number).default(60),
});

export const env = envSchema.parse(process.env);
