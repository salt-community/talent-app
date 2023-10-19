import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { SearchResult } from "types";

export const developerRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAllDevelopers: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.developer.findMany();
    return data.map((i) => ({ id: i.id, firstName: i.firstName }));
  }),

  getDeveloperById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const dev = await ctx.db.developer.findUniqueOrThrow({
        where: { id },
      });
      return {
        id: dev.id,
        image: dev.image,
        firstName: dev.firstName,
        lastName: dev.lastName,
        title: dev.title,
        skills: dev.skills,
        github: dev.github,
        linkedin: dev.linkedin,
      };
    }),

  getSearchedDevelopers: protectedProcedure
    .input(z.object({ search: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.msClient.index("developers").search(input.search);
      const searchData = res.hits as SearchResult[];
      const devs = await ctx.db.developer.findMany({
        where: { id: { in: searchData.map((i) => i.id) } },
      });
      console.log(searchData);
      return devs.map((dev) => ({
        id: dev.id,
        image: dev.image,
        firstName: dev.firstName,
        lastName: dev.lastName,
        title: dev.title,
        skills: dev.skills,
        github: dev.github,
        linkedin: dev.linkedin,
      }));
    }),
});
