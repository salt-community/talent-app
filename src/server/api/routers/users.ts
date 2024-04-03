import { zRole } from "@/utils/zodSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),
  changeRole: protectedProcedure
    .input(z.object({ id: z.string().min(1), zRole }))
    .mutation(
      async ({
        ctx,
        input: {
          id,
          zRole: { role },
        },
      }) => {
        const user = await ctx.db.user.findUnique({ where: { id } });
        if (!user) {
          throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
        }
        if (user.role !== "ADMIN") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "User is not an admin",
          });
        }
        await ctx.db.user.update({ where: { id }, data: { role } });
      },
    ),

  publishDeveloperProfile: protectedProcedure
    .input(z.object({ userId: z.string(), publish: z.boolean() }))
    .mutation(async ({ ctx, input: { userId, publish } }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User is not an admin",
        });
      }

      const status = publish ? "PUBLISHED" : "UNPUBLISHED";

      await ctx.db.user.update({
        where: { id: userId },
        data: {
          developer: {
            update: { status },
          },
        },
      });
    }),

  getInteractionsById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input: { id } }) => {
      const user = await ctx.db.user.findUnique({
        where: { id },
        include: {
          cartItems: {
            select: { date: true, developer: { select: { name: true } } },
          },
          LogClickDev: {
            select: { date: true, developer: { select: { name: true } } },
          },
          LogSearch: { select: { search: true, date: true } },
        },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      return user;
    }),
});
