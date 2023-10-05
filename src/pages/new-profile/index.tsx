import { GetServerSidePropsContext } from "next";
import { NewProfileView } from "@/views/NewProfileView/NewProfileView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoUser } from "@/helpers/requireNoUser";
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser;
};

export const getServerSideProps = requireNoUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const { isActive } = await caller.users.isActive();

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
        },
      } as ServerProps,
    };
  }
);

export default function Page({ user, preferences, circles }: ServerProps) {
  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      <NewProfileView />
    </Layout>
  );
}
