import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { projectsRouter } from "./routers/projects";
import { blogRouter } from "./routers/blog";
import { siteRouter } from "./routers/site";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  projects: projectsRouter,
  blog: blogRouter,
  site: siteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
