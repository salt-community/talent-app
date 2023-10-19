import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { SearchResult } from "types";
import { TRPCError } from "@trpc/server";

export const developerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.developer.findMany();
    return data.map((i) => ({ id: i.id, firstName: i.firstName }));
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const dev = await ctx.db.developer.findUnique({
        where: { id },
      });
      if (!dev) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return dev;
    }),

  getBySearch: protectedProcedure
    .input(z.object({ search: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.msClient.index("developers").search(input.search);
      const searchData = res.hits as SearchResult[];
      const devs = await ctx.db.developer.findMany({
        where: { id: { in: searchData.map((i) => i.id) } },
      });
      return devs.map((dev) => ({
        id: dev.id,
        image: dev.image,
        firstName: dev.firstName,
        lastName: dev.lastName,
        title: dev.title,
        skills: dev.skills,
        github: dev.github,
        linkedin: dev.linkedin,
      }));
    }),
});
