import { z } from "zod";
import { isAdmin } from "../../auth";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      const project = ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session)) {
        throw new Error("User is not an admin");
      }
      const newData = {
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
        data: newData,
      });
      return project;
    }),
});
