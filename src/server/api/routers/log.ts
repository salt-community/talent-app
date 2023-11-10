import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const logRouter = createTRPCRouter({
  logClick: protectedProcedure
    .input(z.object({ developerId: z.string().min(1) }))
    .mutation(async ({ ctx, input: { developerId } }) => {
      const userId = ctx.session.user.id;
      await ctx.db.logClickDev.create({ data: { developerId, userId } });
    }),

  getClicks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.logClickDev.findMany({
      include: {
        User: { select: { name: true, email: true } },
        developer: { select: { image: true, name: true } },
      },
    });
  }),

  getSearch: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.logSearch.findMany({
      include: {
        User: { select: { name: true, email: true } },
      },
    });
  }),
});
