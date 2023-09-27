import { GetServerSidePropsContext } from "next";
import { Layout, LayoutUser } from "../Layout";
import { TermsAndConditionsView } from "@/views/TermsAndConditionsView/TermsAndConditionsView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import React from "react";

type ServerProps = {
  user: LayoutUser;
};

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
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
};

export default function Page({ user }: ServerProps) {
  return (
    <Layout user={user}>
      <TermsAndConditionsView />
    </Layout>
  );
}
