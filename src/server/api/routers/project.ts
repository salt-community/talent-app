import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { projectSchema } from "@/utils/zodSchema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.project.findMany({
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
    const projects = await ctx.db.project_developer.findMany({
      where: { Developer: { User: { some: { id: ctx.session.user.id } } } },
      include: { project: true },
    });
    return projects.map(({ project }) => ({
      id: project.id,
      title: project.title,
    }));
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const project = await ctx.db.project.findUnique({ where: { id } });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project does not exist.",
        });
      }
      return project;
    }),

  update: protectedProcedure
    .input(z.object({ project: projectSchema, id: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id, project } }) => {
      await ctx.db.project.update({ where: { id }, data: project });
    }),

  create: protectedProcedure
    .input(z.object({ project: projectSchema, developerId: z.string().min(1) }))
    .mutation(async ({ ctx, input: { project: data, developerId } }) => {
      const { id: groupId } = await ctx.db.project.create({ data });
      await ctx.db.project_developer.create({ data: { groupId, developerId } });
    }),

  join: protectedProcedure
    .input(
      z.object({
        groupId: z.string().min(1),
        developerId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { developerId, groupId } }) => {
      return await ctx.db.project_developer.create({
        data: { groupId, developerId },
      });
    }),

  leave: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.db.project_developer.delete({ where: { id } });
    }),

  remove: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input: id }) => {
      await ctx.db.project.delete({ where: { id } });
    }),
});
