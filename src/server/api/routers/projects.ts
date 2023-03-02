import { z } from "zod";
import { isAdmin } from "../../auth";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = ctx.prisma.project.findMany();
    return projects;
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      const project = ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
      });
      return project;
    }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        description: z.string().min(1).max(1000),
        demoUrl: z.string().optional(),
        tech: z.string().optional(),
        myRole: z.string().optional(),
        outcome: z.string().optional(),
        feedback: z.string().optional(),
        ifRecreate: z.string().optional(),
        githubUrl: z.string().optional(),
        screenshots: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      const data = {
        name: input.name,
        description: input.description,
        demoUrl: input.demoUrl,
        tech: input.tech,
        myRole: input.myRole,
        outcome: input.outcome,
        feedback: input.feedback,
        ifRecreate: input.ifRecreate,
        githubUrl: input.githubUrl,
      };
      const project = await ctx.prisma.project.create({
        data: data,
      });
      //   add screenshots
      if (input.screenshots) {
        for (const screenshot of input.screenshots) {
          await ctx.prisma.screenshot.create({
            data: {
              url: screenshot,
              projectId: project.id,
            },
          });
        }
      }

      return project;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        name: z.string().min(1).max(100),
        description: z.string().min(1).max(1000),
        demoUrl: z.string().optional(),
        tech: z.string().optional(),
        myRole: z.string().optional(),
        outcome: z.string().optional(),
        feedback: z.string().optional(),
        ifRecreate: z.string().optional(),
        githubUrl: z.string().optional(),
        screenshots: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      const data = {
        name: input.name,
        description: input.description,
        demoUrl: input.demoUrl,
        tech: input.tech,
        myRole: input.myRole,
        outcome: input.outcome,
        feedback: input.feedback,
        ifRecreate: input.ifRecreate,
        githubUrl: input.githubUrl,
      };
      const project = ctx.prisma.project.update({
        where: {
          id: input.id,
        },
        data: data,
      });
      //   remove all screenshots
      await ctx.prisma.screenshot.deleteMany({
        where: {
          projectId: input.id,
        },
      });
      //   add new screenshots
      if (input.screenshots) {
        for (const screenshot of input.screenshots) {
          await ctx.prisma.screenshot.create({
            data: {
              url: screenshot,
              projectId: input.id,
            },
          });
        }
      }
      return project;
    }),
    getScreenshots: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
      })
    )
    .query(async ({ ctx, input }) => {
      const screenshots = ctx.prisma.screenshot.findMany({
        where: {
          projectId: input.id,
        },
      });
      return screenshots;
    }),
});
