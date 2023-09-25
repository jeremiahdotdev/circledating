import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/server/auth/auth";
import { routes } from "@/globals/routes";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: {
          destination: routes.login().href,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
