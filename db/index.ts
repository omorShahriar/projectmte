import * as schema from "./schema";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";

export const db = drizzle(sql, { schema });

migrate(db, { migrationsFolder: "drizzle" });
