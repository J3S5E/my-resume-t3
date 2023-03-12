import { z } from "zod";
import { isAdmin } from "../../auth";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const siteRouter = createTRPCRouter({
  giveAdmin: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!isAdmin(ctx.session) && process.env.NODE_ENV === "production") {
        throw new Error("User is not an admin");
      }
      const user = ctx.prisma.user.update({
        where: {
          id: input.id.toString(),
        },
        data: {
          admin: true,
        },
      });
      return user;
    }),
});
