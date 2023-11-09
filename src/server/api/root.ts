import { developerRouter } from "@/server/api/routers/developer";
import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { mobRouter } from "./routers/mob";
import { cartRouter } from "./routers/cart";
import { logRouter } from "./routers/log";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  developer: developerRouter,
  project: projectRouter,
  mob: mobRouter,
  cart: cartRouter,
  log: logRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
