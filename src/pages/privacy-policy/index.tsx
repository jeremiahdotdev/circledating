import { GetServerSidePropsContext } from "next";
import { PrivacyPolicyView } from "@/views/PrivacyPolicyView/PrivacyPolicyView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps;

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { ctx } = await getPrismaContext(_ctx);
  const caller = appRouter.createCaller(ctx);
  const [{ isActive, username, notifications }, { preferences, circles }] =
    await Promise.all([caller.users.stats(), caller.preferences.read()]);

  return {
    props: {
      nav: {
        isAuthed: !!ctx.session,
        isActive: isActive,
        username: username,
        preferences: preferences,
        circles: circles,
        notifications: notifications,
      },
    } as ServerProps,
  };
};

export default function Page({ nav }: ServerProps) {
  return (
    <Layout nav={nav}>
      <PrivacyPolicyView />
    </Layout>
  );
}
