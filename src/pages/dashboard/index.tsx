import { GetServerSidePropsContext } from "next";
import { Infographic } from "@/components/Shared/Infographic";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useSession } from "next-auth/react";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & { isNew: boolean };

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [
      { isNew, isActive, username, notifications },
      { preferences, circles },
    ] = await Promise.all([caller.users.stats(), caller.preferences.read()]);

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          notifications: notifications,
          username: username,
          preferences: preferences,
          circles: circles,
        },
        isNew: isNew,
      } as ServerProps,
    };
  }
);

export default function Page({ nav, isNew }: ServerProps) {
  return (
    <Layout nav={nav}>
      <Infographic
        message={
          isNew
            ? systemMessages.GETTING_STARTED
            : systemMessages.DATING_HINTS[
                Math.floor(Math.random() * systemMessages.DATING_HINTS.length)
              ]
        }
      />
    </Layout>
  );
}
