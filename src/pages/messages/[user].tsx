import { GetServerSidePropsContext } from "next";
import { MessagesView } from "@/views/MessagesView/MessagesView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [{ isActive, username }, { preferences, circles }] =
      await Promise.all([caller.users.stats(), caller.preferences.read()]);

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
        },
        preferences: preferences,
        circles: circles,
      } as ServerProps,
    };
  }
);

export default function Page({ user, preferences, circles }: ServerProps) {
  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      <MessagesView />
    </Layout>
  );
}
