import { GetServerSidePropsContext } from "next";
import { LoginView } from "@/views/LoginView/LoginView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoAuth } from "@/helpers/requireNoAuth";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps;

export const getServerSideProps = requireNoAuth(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [{ isActive, username, notifications }, { preferences, circles }] =
      await Promise.all([caller.users.stats(), caller.preferences.read()]);

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
      } as ServerProps,
    };
  }
);

export default function Page({ nav }: ServerProps) {
  return (
    <Layout nav={nav}>
      <LoginView />
    </Layout>
  );
}
