import { z } from "zod";
import { isAdmin } from "../../auth";

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
        if (!isAdmin(ctx.session)) {
            throw new Error("User is not an admin");
        }
        const project = ctx.prisma.project.create({
            data: {
                name: input.name,
                description: input.description
            },
        });
        return project;
    }),
});
