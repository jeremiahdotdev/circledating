import { CirclesView } from "@/views/CirclesView/CirclesView";
import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type CirclesServerProps = {
  user: UserSlice;
  featured: ReadCircleSchemaType[];
  current: ReadCircleSchemaType[];
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [
      { isActive, username, notifications },
      { preferences, circles },
      featured,
      current,
    ] = await Promise.all([
      caller.users.stats(),
      caller.preferences.read(),
      caller.circles.readFeatured(),
      caller.circles.readCurrent(),
    ]);
    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          notifications: notifications,
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

export default function Page({ user, featured, current }: CirclesServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <CirclesView featured={featured} current={current} />
    </Layout>
  );
}
