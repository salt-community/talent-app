import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { SearchResult } from "types";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  getByDev: protectedProcedure
    .input(z.object({ developerId: z.string().min(1) }))
    .query(async ({ ctx, input: { developerId } }) => {
      const projects = await ctx.db.project.findMany({
        where: { Project_developer: { every: { developerId } } },
      });
      return projects.map((project) => ({
        id: project.id,
        title: project.title,
      }));
    }),
});
