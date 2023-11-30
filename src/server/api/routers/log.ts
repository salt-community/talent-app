import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const logRouter = createTRPCRouter({
  logClick: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .mutation(({ ctx, input: { slug } }) => {
      const userId = ctx.session.user.id;
      ctx.db.developer
        .findUnique({ where: { slug }, select: { id: true } })
        .then((dev) => {
          if (!dev) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Could not find developer.",
            });
          }
          ctx.db.logClickDev
            .create({ data: { developerId: dev.id, userId } })
            .catch(() => {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Could not log",
              });
            });
        })
        .catch(() => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not log.",
          });
        });
    }),

  getClicks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.logClickDev.findMany({
      include: {
        User: { select: { name: true, email: true } },
        developer: { select: { image: true, name: true } },
      },
      orderBy: { date: "desc" },
    });
  }),

  getSearch: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.logSearch.findMany({
      include: {
        User: { select: { name: true, email: true } },
      },
      orderBy: { date: "desc" },
    });
  }),

  getCarts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.cartItem.findMany({
      select: {
        userId: true,
        id: true,
        date: true,
        comment: true,
        developer: { select: { name: true } },
        User: { select: { email: true } },
      },
      orderBy: { date: "desc" },
    });
  }),
});
