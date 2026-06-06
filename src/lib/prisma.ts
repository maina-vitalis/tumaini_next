import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 requires a driver adapter for direct database connections.
// See: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction

const createAdapter = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  return new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
};

const prismaClientSingleton = () => {
  const adapter = createAdapter();
  return new PrismaClient({ adapter });
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | PrismaClient;
}

let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  try {
    prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
    if (process.env.NODE_ENV !== "production") {
      globalThis.prismaGlobal = prisma;
    }
  } catch (err) {
    // Guard for build-time / CI when DATABASE_URL may be missing or the client
    // cannot be constructed (e.g. during static page data collection in Next.js).
    // At real runtime with a valid DATABASE_URL this should succeed.
    console.warn(
      "[prisma] Client construction failed (build-time or misconfigured datasource). Using no-op proxy. " +
        "Ensure DATABASE_URL is set and the @prisma/adapter-pg + pg packages are installed.",
      err
    );
    prisma = createPrismaDummy() as unknown as PrismaClient;
  }
} else {
  prisma = createPrismaDummy() as unknown as PrismaClient;
}

function createPrismaDummy() {
  return new Proxy({} as any, {
    get() {
      throw new Error(
        "Prisma client not initialized: a valid DATABASE_URL (and Prisma 7 compatible adapter setup) is required at runtime. " +
          "See prisma.config.ts and src/lib/prisma.ts for the correct v7 configuration."
      );
    },
  });
}

export default prisma;
