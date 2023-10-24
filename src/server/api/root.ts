import { developerRouter } from "@/server/api/routers/developer";
import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  developer: developerRouter,
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
