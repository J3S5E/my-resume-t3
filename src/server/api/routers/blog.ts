import { z } from "zod";
import { isAdmin } from "../../auth";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = ctx.prisma.blogPost.findMany();
    return posts;
  }),

  post: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(1000),
        content: z.string().min(1).max(10000),
        description: z.string().min(1).max(1000),
        published: z.boolean(),
        slug: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      if (!ctx.session?.user.id) {
        throw new Error("User is not logged in");
      }
      const data = {
        title: input.title,
        content: input.content,
        description: input.description,
        published: input.published,
        slug: input.slug,
        posterId: ctx.session?.user.id,
      };
      const post = await ctx.prisma.blogPost.create({
        data: data,
      });
      return post;
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        title: z.string().min(1).max(1000),
        content: z.string().min(1).max(10000),
        description: z.string().min(1).max(1000),
        published: z.boolean(),
        slug: z.string().min(1).max(1000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      if (!ctx.session?.user.id) {
        throw new Error("User is not logged in");
      }
      const data = {
        title: input.title,
        content: input.content,
        description: input.description,
        published: input.published,
        slug: input.slug,
      };
      const post = await ctx.prisma.blogPost.update({
        where: {
          id: input.id,
        },
        data: data,
      });
      return post;
    }),

  getPoster: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.blogPost.findUnique({
        where: {
          id: input.id,
        },
        select: {
          posterId: true,
        },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const poster = await ctx.prisma.user.findUnique({
        where: {
          id: post.posterId,
        },
        select: {
          name: true,
          image: true,
        },
      });

      return poster;
    }),
});
