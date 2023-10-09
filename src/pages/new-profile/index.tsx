import { GetServerSidePropsContext } from "next";
import { NewProfileView } from "@/views/NewProfileView/NewProfileView";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoUser } from "@/helpers/requireNoUser";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps;

export const getServerSideProps = requireNoUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
        },
      } as ServerProps,
    };
  }
);

export default function Page({ nav }: ServerProps) {
  return (
    <Layout nav={nav}>
      <NewProfileView />
    </Layout>
  );
}
