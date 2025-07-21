import { GetServerSidePropsContext } from "next";
import { PrismaContext } from "@/server/api/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/server/auth/auth";
import { prisma } from "@/server/db";
import { routes } from "@/globals/routes";
import { userScripts } from "@/server/api/prisma/userScripts";

export const insistOn =
  (
    options: {
      user?: boolean;
      auth?: boolean;
      noUser?: boolean;
      noAuth?: boolean;
    },
    func?: (
      pctx: PrismaContext,
      ctx: GetServerSidePropsContext
    ) => Promise<object | undefined>[]
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (
      (options.auth || options.user || options.noUser) &&
      (!session || !session.user || !session.user.email)
    ) {
      return {
        redirect: {
          destination: routes.login().href,
          permanent: false,
        },
      };
    }

    if (options.noAuth && session) {
      return {
        redirect: {
          destination: routes.dashboard().href,
          permanent: false,
        },
      };
    }

    const prismaContext = {
      ctx: { prisma: prisma, session: session },
    };

    type UserProps = { user?: { isActive?: boolean } };

    const awaitables: object[] = [userScripts.query.require(prismaContext)];
    if (func) {
      awaitables.push(...func(prismaContext, ctx));
    }

    const dataSets: UserProps[] = await Promise.all(awaitables);
    const result = {
      props: {
        ...dataSets.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      } as UserProps,
    };

    if (options.user && (!result.props.user || !result.props.user.isActive)) {
      return {
        redirect: {
          destination: routes.newProfile().href,
          permanent: false,
        },
      };
    }

    if (options.noUser && result.props.user && result.props.user.isActive) {
      return {
        redirect: {
          destination: routes.dashboard().href,
          permanent: false,
        },
      };
    }

    return result;
  };
