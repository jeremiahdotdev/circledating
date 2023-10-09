import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { handleError } from "@/utils/handleError";
import { nextAuthOptions } from "@/server/auth/auth";
import { prisma } from "@/server/db";
import { routes } from "@/globals/routes";

export const hydrateLayoutProps =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session || !session.user || !session.user.email) {
      return {
        redirect: {
          destination: routes.login().href,
          permanent: false,
        },
      };
    }

    let user;
    try {
      user = await prisma.user.findUniqueOrThrow({
        where: {
          email: session.user.email,
        },
        select: {
          username: true,
          profile: true,
        },
      });
    } catch (error: unknown) {
      handleError(error);
    }

    if (!user || !user.profile) {
      return {
        redirect: {
          destination: routes.newProfile().href,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
