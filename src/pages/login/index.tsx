import { GetServerSidePropsContext } from "next";
import { LoginView } from "@/views/LoginView/LoginView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoAuth } from "@/helpers/requireNoAuth";
import Layout, { LayoutUser } from "../Layout";
import React from "react";

type ServerProps = {
  user: LayoutUser;
};

export const getServerSideProps = requireNoAuth(
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

export default function Page({ user }: ServerProps) {
  return (
    <Layout user={user}>
      <LoginView />
    </Layout>
  );
}
