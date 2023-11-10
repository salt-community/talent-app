import { zRole } from "@/utils/zodSchema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

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
        await ctx.db.user.update({ where: { id }, data: { role } });
      },
    ),
});
