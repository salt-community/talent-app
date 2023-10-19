import { PrismaClient } from "@prisma/client";

import { env } from "@/env.mjs";
// import { seed } from "./mockdata";
// import populateMeilisearch from "./seedMeilisearch";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// populateMeilisearch().catch(() => console.log('ba'))
// seed().catch(() => console.log('ba'))
