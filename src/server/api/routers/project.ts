import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { projectSchema } from "@/utils/zodSchema";
import { z } from "zod";

export const projectRouter = createTRPCRouter({
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
  create: protectedProcedure
    .input(projectSchema)
    .mutation(({ ctx, input: data }) => {
      return ctx.db.project.create({ data });
    }),

  connectToDeveloper: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
        developerId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { developerId, projectId } }) => {
      return await ctx.db.project_developer.create({
        data: { projectId, developerId },
      });
    }),
});
