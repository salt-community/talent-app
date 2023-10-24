import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { SearchResult } from "types";
import { TRPCError } from "@trpc/server";
import { devSchema } from "@/utils/zodSchema";

export const developerRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const dev = await ctx.db.developer.findUnique({
        where: { id },
        include: {
          mobs: {
            select: {
              Mob: {
                select: {
                  id: true,
                  name: true,
                  members: {
                    select: {
                      Developer: {
                        select: {
                          id: true,
                          name: true,
                          image: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          projects: {
            include: {
              project: {
                select: { description: true, title: true, youtube: true },
              },
            },
          },
        },
      });
      if (!dev) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return {
        ...dev,
        projects: dev.projects.map((project) => ({
          description: project.project.description,
          title: project.project.title,
          youtube: project.project.youtube,
          id: project.projectId,
        })),
        mobs: dev.mobs.map((mob) => {
          if (mob.Mob) {
            return {
              id: mob.Mob.id,
              name: mob.Mob.name,
              members: mob.Mob.members.map((member) => {
                if (member.Developer)
                  return {
                    id: member.Developer.id,
                    name: member.Developer.name,
                    image: member.Developer.image,
                  };
              }),
            };
          }
        }),
      };
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
        name: dev.name,
        title: dev.title,
        skills: dev.skills,
        gitHubUrl: dev.gitHubUrl,
        linkedinUrl: dev.linkedinUrl,
      }));
    }),

  create: protectedProcedure
    .input(devSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const lastModified = new Date();
      const developer = await ctx.db.developer.create({
        data: { userId, lastModified, ...input },
      });
      return developer;
    }),

  getRecentTen: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.developer.findMany({
      orderBy: { lastModified: "asc" },
      take: 10,
    });
    return data.map((dev) => ({
      id: dev.id,
      image: dev.image,
      name: dev.name,
      title: dev.title,
      skills: dev.skills,
      gitHubUrl: dev.gitHubUrl,
      linkedinUrl: dev.linkedinUrl,
    }));
  }),

  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.developer.findUnique({
      where: { userId: ctx.session.user.id },
    });
    if (user) {
      return {
        id: user.id,
        image: user.image,
        name: user.name,
      };
    }
    return null;
  }),
});
