import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.POSTGRES_HOST as string,
    user: "default",
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DATABASE as string,
    ssl: true,
  },
} satisfies Config;
