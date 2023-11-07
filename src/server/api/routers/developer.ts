import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { SearchResult } from "types";
import { TRPCError } from "@trpc/server";
import { devSchema, searchDevSchema } from "@/utils/zodSchema";
import seedMeilisearch from "@/server/seedMeilisearch";

export const developerRouter = createTRPCRouter({
  getById: publicProcedure
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
                select: {
                  description: true,
                  title: true,
                  youtube: true,
                  githubLink: true,
                },
              },
            },
          },
        },
      });
      if (!dev) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const mobs = dev.mobs.map(({ Mob: { id, name, members } }) => ({
        id,
        name,
        members: members.map(({ Developer: { id, image, name } }) => ({
          id,
          name,
          image,
        })),
      }));
      return {
        ...dev,
        projects: dev.projects.map((project) => ({
          description: project.project.description,
          title: project.project.title,
          youtube: project.project.youtube,
          id: project.groupId,
          githublink: project.project.githubLink,
        })),
        mobs,
      };
    }),

  getBySearch: publicProcedure
    .input(searchDevSchema)
    .query(async ({ ctx, input: { search } }) => {
      if (search === "") {
        console.log("Only 10");
        const data = await ctx.db.developer.findMany({
          orderBy: { lastModified: "desc" },
          take: 8,
        });
        return data.map(({ skills, title, description, name, image, id }) => ({
          skills,
          title,
          description,
          name,
          image,
          id,
        }));
      }
      try {
        const res = await ctx.msClient.index("developers").search(search);
        const searchData = res.hits as SearchResult[];
        return searchData;
      } catch (error) {
        console.log(error);
        const mode = "insensitive";
        const data = await ctx.db.developer.findMany({
          where: {
            OR: [
              { description: { contains: search, mode } },
              { name: { contains: search, mode } },
              { title: { contains: search, mode } },
              { skills: { has: search } },
            ],
          },
        });
        return data.map(({ skills, title, description, name, image, id }) => ({
          skills,
          title,
          description,
          name,
          image,
          id,
        }));
      }
    }),

  create: protectedProcedure
    .input(devSchema)
    .mutation(async ({ ctx, input: dev }) => {
      const id = ctx.session.user.id;
      const lastModified = new Date();
      await ctx.db.developer.create({
        data: { ...dev, lastModified, User: { connect: { id } } },
      });
      await seedMeilisearch();
    }),

  update: protectedProcedure
    .input(z.object({ dev: devSchema, id: z.string().min(1) }))
    .mutation(async ({ ctx, input: { dev, id } }) => {
      const lastModified = new Date();
      await ctx.db.developer.update({
        where: { id },
        data: { ...dev, lastModified },
      });
      await seedMeilisearch();
    }),

  getByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.developer.findFirst({
      where: { User: { every: { id: ctx.session.user.id } } },
      select: { id: true, image: true, name: true },
    });
  }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.db.developer.delete({ where: { id } });
      await seedMeilisearch();
    }),
});
