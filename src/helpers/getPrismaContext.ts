import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/server/auth/auth";
import { prisma } from "@/server/db";

export const getPrismaContext = async (
  ctx: GetServerSidePropsContext,
  input?: unknown
) => {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

  const prismaContext = {
    input: input,
    ctx: { prisma: prisma, session: session },
  };
  return prismaContext;
};
