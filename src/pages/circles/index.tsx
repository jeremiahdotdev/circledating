import { CirclesView } from "@/views/CirclesView/CirclesView";
import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import Layout, { LayoutUser } from "../Layout";
import React from "react";

export type CirclesServerProps = {
  user: LayoutUser;
  featured: ReadCircleSchemaType[];
  current: ReadCircleSchemaType[];
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const { isActive } = await caller.users.isActive();
    const featured = await caller.circles.readFeatured();
    const current = await caller.circles.readCurrent();
    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
        },
        featured: featured ?? [],
        current: current ?? [],
      } as CirclesServerProps,
    };
  }
);

export default function Page({ user, featured, current }: CirclesServerProps) {
  return (
    <Layout user={user}>
      <CirclesView user={user} featured={featured} current={current} />
    </Layout>
  );
}
