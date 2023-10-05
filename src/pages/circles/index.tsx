import { CirclesView } from "@/views/CirclesView/CirclesView";
import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import Layout, { LayoutNavProps } from "../Layout";
import React from "react";

export type CirclesServerProps = LayoutNavProps & {
  featured: ReadCircleSchemaType[];
  current: ReadCircleSchemaType[];
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

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

    console.log(preferences);

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
        },
        preferences: preferences,
        circles: circles,
        featured: featured ?? [],
        current: current ?? [],
      } as CirclesServerProps,
    };
  }
);

export default function Page({
  user,
  preferences,
  circles,
  featured,
  current,
}: CirclesServerProps) {
  return (
    <Layout user={user} preferences={preferences} circles={circles}>
      <CirclesView featured={featured} current={current} />
    </Layout>
  );
}
