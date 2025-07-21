import { GetServerSidePropsContext } from "next";
import { PrismaContext } from "@/server/api/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/server/auth/auth";
import { prisma } from "@/server/db";
import { routes } from "@/globals/routes";

export const requireNoAuth =
  (
    func?: (
      pctx: PrismaContext,
      ctx: GetServerSidePropsContext
    ) => Promise<object | undefined>[]
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
    if (session) {
      return {
        redirect: {
          destination: routes.dashboard().href, // signed-in home path
          permanent: false,
        },
      };
    }

    const prismaContext = {
      ctx: { prisma: prisma, session: session },
    };

    const awaitables: object[] = [];
    if (func) {
      awaitables.push(...func(prismaContext, ctx));
    }

    const dataSets: object[] = await Promise.all(awaitables);
    const result = {
      props: {
        ...dataSets.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      },
    };

    return result;
  };
