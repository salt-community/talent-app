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

// const shuffleArray = <T>(array: T[]): T[] => {
//   const newArray = [...array];
//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]] as [T, T];
//   }
//   return newArray;
// };

const getGitHubUsername = (gitHubLink: string): string | null => {
  const regex = /github\.com\/([^/]+)\/?/;
  const match = gitHubLink.match(regex);
  if (match?.[1]) {
    return match[1];
  } else {
    return null;
  }
};

export const developerRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const developer = await ctx.db.developer.findUnique({ where: { id } });
      if (!developer) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Developer not found!",
        });
      }
      return developer;
    }),

  getBySlug: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id: slug } }) => {
      const dev = await ctx.db.developer.findUnique({
        where: { slug },
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
                          slug: true,
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
            orderBy: { order: "asc" },
          },
        },
      });
      if (!dev) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const mobs = dev.mobs.map(({ Mob: { members, ...rest } }) => ({
        ...rest,
        members: members.map(({ Developer }) => ({ ...Developer })),
      }));
      const gitHubUsername = getGitHubUsername(dev.gitHubUrl);
      return {
        ...dev,
        gitHubUsername,
        projects: dev.projects.map((project) => ({
          description: project.project.description,
          title: project.project.title,
          youtube: project.project.youtube,
          id: project.groupId,
          githublink: project.project.githubLink,
          order: project.order,
        })),
        mobs,
      };
    }),

  getBySearch: publicProcedure
    .input(searchDevSchema)
    .query(async ({ ctx, input: { search } }) => {
      let cart: string[] = [];
      if (ctx.session && ctx.session.user.role === "CLIENT") {
        const userId = ctx.session.user.id;
        const res = await ctx.db.cartItem.findMany({
          where: { userId },
          select: { developerId: true },
        });
        cart = res.map(({ developerId }) => developerId);
        if (!!search) {
          ctx.db.logSearch.create({ data: { userId, search } }).catch(() => {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "1234",
            });
          });
        }
      }
      if (search === "") {
        const data = await ctx.db.developer.findMany({
          orderBy: { name: "asc" },
        });
        return data.map(
          ({ skills, title, description, name, image, slug, id }) => ({
            skills,
            title,
            description,
            name,
            image,
            slug,
            id,
            inCart: !!cart.find((i) => i === id),
          }),
        );
      }

      try {
        const res = await ctx.msClient.index("developers").search(search);
        const searchData = res.hits as SearchResult[];
        return searchData.map((dev) => ({
          ...dev,
          inCart: !!cart.find((i) => i === dev.id),
        }));
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
        return data.map(
          ({ skills, title, description, name, image, slug, id }) => ({
            skills,
            title,
            description,
            name,
            image,
            slug,
            id,
            inCart: !!cart.find((i) => i === id),
          }),
        );
      }
    }),

  create: protectedProcedure
    .input(devSchema)
    .mutation(async ({ ctx, input: { skills, locationPref, ...rest } }) => {
      const id = ctx.session.user.id;
      const lastModified = new Date();
      const dev = {
        ...rest,
        skills: skills.map((i) => i.skill),
        locationPref: locationPref.map((i) => i.location),
      };
      await ctx.db.developer.create({
        data: { ...dev, lastModified, User: { connect: { id } } },
      });
      await seedMeilisearch();
    }),

  update: protectedProcedure
    .input(z.object({ dev: devSchema, id: z.string().min(1) }))
    .mutation(
      async ({
        ctx,
        input: {
          dev: { locationPref, skills, ...rest },
          id,
        },
      }) => {
        const dev = {
          ...rest,
          skills: skills.map((i) => i.skill),
          locationPref: locationPref.map((i) => i.location),
        };
        const lastModified = new Date();
        await ctx.db.developer.update({
          where: { id },
          data: { ...dev, lastModified },
        });
        await seedMeilisearch();
      },
    ),

  getByUser: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.developer.findFirst({
      where: { User: { every: { id: ctx.session.user.id } } },
      select: {
        id: true,
        image: true,
        name: true,
        projects: {
          select: { id: true, project: true, order: true },
          orderBy: { order: "asc" },
        },
        mobs: { select: { Mob: true } },
      },
    });
    if (data) {
      return {
        ...data,
        projects: data.projects.map(({ id, project, order }) => ({
          id,
          projectId: project.id,
          title: project.title,
          order,
        })),
        mobs: data.mobs.map(({ Mob }) => ({
          id: Mob.id,
          name: Mob.name,
        })),
      };
    }
    return null;
  }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.db.developer.delete({ where: { id } });
      await seedMeilisearch();
    }),

  updateSlug: protectedProcedure
    .input(z.object({ id: z.string().min(1), slug: z.string().min(1) }))
    .mutation(async ({ ctx, input: { id, slug } }) => {
      try {
        await ctx.db.developer.update({ where: { id }, data: { slug } });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Slug already used!",
        });
      }
    }),
});
