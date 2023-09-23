import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/server/auth/auth";
import { routes } from "@/globals/routes";

export const requireNoAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (session) {
      return {
        redirect: {
          destination: routes.dashboard().href, // signed-in home path
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
