import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { mobSchema } from "@/utils/zodSchema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const mobRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.mob.findMany({
      include: {
        members: {
          select: {
            id: true,
            Developer: { select: { image: true, id: true } },
          },
        },
      },
    });

    return data.map((i) => {
      const { members, ...rest } = i;
      return {
        ...rest,
        members: members.map((connection) => {
          return {
            connectionId: connection.id,
            developerId: connection.Developer!.id,
            image: connection.Developer!.image,
          };
        }),
      };
    });
  }),

  getByDev: protectedProcedure.query(async ({ ctx }) => {
    const mob = await ctx.db.mob_developer.findMany({
      where: { Developer: { User: { some: { id: ctx.session.user.id } } } },
      include: { Mob: true },
    });
    return mob.map(({ Mob }) => ({
      id: Mob.id,
      name: Mob.name,
    }));
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const mob = await ctx.db.mob.findUnique({ where: { id } });
      if (!mob) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Mob does not exist.",
        });
      }
      return mob;
    }),

  update: protectedProcedure
    .input(z.object({ mob: mobSchema, id: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id, mob } }) => {
      await ctx.db.mob.update({ where: { id }, data: mob });
    }),

  create: protectedProcedure
    .input(z.object({ mob: mobSchema, developerId: z.string().min(1) }))
    .mutation(async ({ ctx, input: { mob: data, developerId } }) => {
      const { id: groupId } = await ctx.db.mob.create({ data });
      await ctx.db.mob_developer.create({ data: { groupId, developerId } });
    }),

  join: protectedProcedure
    .input(
      z.object({
        groupId: z.string().min(1),
        developerId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { developerId, groupId } }) => {
      return await ctx.db.mob_developer.create({
        data: { groupId, developerId },
      });
    }),

  leave: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.db.mob_developer.delete({ where: { id } });
    }),

  remove: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input: id }) => {
      await ctx.db.mob.delete({ where: { id } });
    }),
});
