import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const db = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    // If the prop is thenable or special JS/TS inspection properties, return undefined or handle gracefully
    if (prop === "then" || prop === "toJSON" || prop === "$$typeof") {
      return undefined;
    }
    
    const client = getPrismaClient();
    return Reflect.get(client, prop, receiver);
  },
});
