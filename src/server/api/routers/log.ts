import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const logRouter = createTRPCRouter({
  logClick: protectedProcedure
    .input(z.object({ developerId: z.string().min(1) }))
    .mutation(({ ctx, input: { developerId } }) => {
      const userId = ctx.session.user.id;
      ctx.db.logClickDev.create({ data: { developerId, userId } }).catch(() => {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not log",
        });
      });
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

  getCarts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cartItem.findMany({
      select: {
        id: true,
        date: true,
        developer: { select: { name: true } },
        User: { select: { email: true, id: true } },
      },
    });
  }),
});
