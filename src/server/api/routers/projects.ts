import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const projectsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        const projects = ctx.prisma.project.findMany();
        return projects;
    }),
    add: publicProcedure.input(z.object({
        name: z.string(),
        description: z.string()
    })).mutation(async ({ ctx, input }) => {
        const project = ctx.prisma.project.create({
            data: {
                name: input.name,
                description: input.description
            },
        });
        return project;
    }),
});
