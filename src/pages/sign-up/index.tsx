import { GetServerSidePropsContext } from "next";
import { SignUpView } from "@/views/SignUpView/SignUpView";
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
    const { isActive } = await caller.users.stats();

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          notifications: notifications,
        },
      } as ServerProps,
    };
  }
);

export default function Page({ nav }: ServerProps) {
  return (
    <Layout nav={nav}>
      <SignUpView />
    </Layout>
  );
}
