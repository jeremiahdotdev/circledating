import { CircleView } from "@/views/CircleView/CircleView";
import { GetServerSidePropsContext } from "next";
import { Layout, LayoutUser } from "../Layout";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import React from "react";

type ServerProps = {
  user: LayoutUser;
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const { isActive, isAdmin } = await caller.users.isActive();
    const circle = await caller.circles.readByName(
      routerQueryAttributeToString(_ctx.query.name)
    );

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          isAdmin: isAdmin,
        },
        circle: circle,
      } as ServerProps,
    };
  }
);

export default function Page({ circle, user }: ServerProps) {
  return (
    <Layout user={user}>
      <CircleView isAdmin={user.isAdmin} circle={circle} />
    </Layout>
  );
}
