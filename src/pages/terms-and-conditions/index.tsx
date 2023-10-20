import { GetServerSidePropsContext } from "next";
import { TermsAndConditionsView } from "@/views/TermsAndConditionsView/TermsAndConditionsView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps;

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { ctx } = await getPrismaContext(_ctx);
  const caller = appRouter.createCaller(ctx);
  const { isActive } = await caller.users.stats();

  return {
    props: {
      nav: {
        isAuthed: !!ctx.session,
        isActive: isActive,
      },
    } as ServerProps,
  };
};

export default function Page({ nav }: ServerProps) {
  return (
    <Layout nav={nav}>
      <TermsAndConditionsView />
    </Layout>
  );
}
