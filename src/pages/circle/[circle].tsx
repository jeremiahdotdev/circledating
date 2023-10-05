import { CircleView } from "@/views/CircleView/CircleView";
import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser;
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const [{ isActive, username }, { preferences, circles }, circle] =
      await Promise.all([
        caller.users.stats(),
        caller.preferences.read(),
        caller.circles.readByName(
          routerQueryAttributeToString(_ctx.query.circle)
        ),
      ]);

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
        },
        preferences: preferences,
        circles: circles,
        circle: circle,
      } as ServerProps,
    };
  }
);

export default function Page({
  circle,
  user,
  preferences,
  circles,
}: ServerProps) {
  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      <CircleView isAdmin={user.isAdmin} circle={circle} />
    </Layout>
  );
}
