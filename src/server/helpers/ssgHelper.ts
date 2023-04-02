import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { prisma } from "../db";
import { appRouter } from "../api/root";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, session: null },
    transformer: superjson, // optional - adds superjson serialization
  });