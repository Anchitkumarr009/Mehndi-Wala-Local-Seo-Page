import { PrismaClient } from "@prisma/client";

const defaultDatabaseUrl =
  "postgresql://postgres.aanuzkxqcbsimgsoraez:Mehndiwala786@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

const rawUrl = (process.env.DATABASE_URL || "").trim().replace(/^["']|["']$/g, "");
const databaseUrl =
  rawUrl.startsWith("postgresql://") || rawUrl.startsWith("postgres://")
    ? rawUrl
    : defaultDatabaseUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
