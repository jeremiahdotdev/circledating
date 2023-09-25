import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { initTRPC } from "@trpc/server";
import { nextAuthOptions } from "../auth/auth";
import { prisma } from "../db";
import superjson from "superjson";

export const createTRPCContext = async (_opts: CreateNextContextOptions) => {
  const { req, res } = _opts;
  const session = await getServerSession(req, res, nextAuthOptions);

  return {
    session,
    prisma,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
