import { developerRouter } from "@/server/api/routers/developer";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  developer: developerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
