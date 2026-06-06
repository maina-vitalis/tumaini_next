import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Prisma 7 requires valid construction (adapter/accelerate or proper datasource setup via prisma.config.ts).
  // Guarded so that builds (which may evaluate route modules without DATABASE_URL present) do not crash.
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | PrismaClient;
}

let prisma: PrismaClient;

if (process.env.DATABASE_URL) {
  try {
    prisma = (globalThis.prismaGlobal ?? prismaClientSingleton()) as PrismaClient;
    if (process.env.NODE_ENV === "production") globalThis.prismaGlobal = prisma;
  } catch (err) {
    // Catch Prisma 7 ctor validation (e.g. during `next build` page data collection when the
    // loaded .env DATABASE_URL is not sufficient for the new client/adapter requirements).
    // Real DB operations will fail later if connection is bad; build succeeds.
    console.warn("[prisma] Client construction failed (build-time or misconfigured datasource). Using no-op proxy.", err);
    prisma = createPrismaDummy() as unknown as PrismaClient;
  }
} else {
  prisma = createPrismaDummy() as unknown as PrismaClient;
}

function createPrismaDummy() {
  return new Proxy({} as any, {
    get() {
      throw new Error(
        "Prisma client not initialized: a valid DATABASE_URL (and Prisma 7 compatible config) is required at runtime."
      );
    },
  });
}

export default prisma;
