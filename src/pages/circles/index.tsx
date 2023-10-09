import { CirclesView } from "@/views/CirclesView/CirclesView";
import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

export type CirclesServerProps = LayoutProps & {
  featured: ReadCircleSchemaType[];
  current: ReadCircleSchemaType[];
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const x = new Date();

    const [
      { isActive, username },
      { preferences, circles },
      featured,
      current,
    ] = await Promise.all([
      caller.users.stats(),
      caller.preferences.read(),
      caller.circles.readFeatured(),
      caller.circles.readCurrent(),
    ]);

    console.log(x);
    const y = new Date();
    console.log(y);

    console.log(
      1000 * (y.getSeconds() - x.getSeconds()) +
        (y.getMilliseconds() - x.getMilliseconds())
    );

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
          preferences: preferences,
          circles: circles,
        },
        featured: featured ?? [],
        current: current ?? [],
      } as CirclesServerProps,
    };
  }
);

export default function Page({ nav, featured, current }: CirclesServerProps) {
  return (
    <Layout nav={nav}>
      <CirclesView featured={featured} current={current} />
    </Layout>
  );
}
