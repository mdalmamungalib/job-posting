import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
import { env } from "@prisma/config";

const pool = new Pool({ connectionString: env("DATABASE_URL") });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });