import z from 'zod/v4';
import { th } from 'zod/locales';

z.config(th());
const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'staging', 'production']),
    HOST_API_URL: z.string().regex(/^(http|https):\/\/.*/),
    HOST_API_PORT: z
      .string()
      .regex(/^\d.*$/)
      .min(3)
      .max(5)
      .default('3000'),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379'),
    API_KEY_SECRET: z.string().default('default-api-key-secret'),
    JWT_ACCESS_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    EXPIRE_ACCESS_TOKEN: z.string().default('900'),
    EXPIRE_REFRESH_TOKEN: z.string().default('86400'),
  })
  .transform((data) => ({
    server: {
      NODE_ENV: data.NODE_ENV,
      HOST_API_PORT: Number(data.HOST_API_PORT),
      HOST_API_URL: data.HOST_API_URL,
      API_KEY_SECRET: data.API_KEY_SECRET,
    },
    database: {
      url: data.DATABASE_URL,
    },
    redis: {
      REDIS_URL: data.REDIS_URL,
      REDIS_PORT: Number(data.REDIS_PORT),
    },
    encryption: {
      JWT_ACCESS_SECRET: data.JWT_ACCESS_SECRET,
      JWT_REFRESH_SECRET: data.JWT_REFRESH_SECRET,
      EXPIRE_ACCESS_TOKEN: data.EXPIRE_ACCESS_TOKEN,
      EXPIRE_REFRESH_TOKEN: data.EXPIRE_REFRESH_TOKEN,
    },
  }));

const parsed = envSchema.safeParse(Bun.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  parsed.error.issues.forEach((issue: any) => {
    // console.log('🚀 ~ parsed.error.issues.forEach ~ issue:', issue);
    console.log(`\x1b[33m${issue.path}\x1b[0m "${issue.code}: ${issue.message}"`);
  });
  process.exit(1);
}

export default parsed.data;
