import { CircleView } from "@/views/CircleView/CircleView";
import { GetServerSidePropsContext } from "next";
import { PrismaContext, PrismaParameter } from "@/server/api/types";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { UserSlice, setUser } from "@/store/userSlice";
import { circleScripts } from "@/server/api/prisma/circleScripts";
import { insistOn } from "@/helpers/insistOn";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

type ServerProps = {
  user: UserSlice;
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = insistOn(
  { user: true },
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const param = {
      ctx: prisma.ctx,
      input: routerQueryAttributeToString(ctx.query.circle),
    } as PrismaParameter<string>;
    return [circleScripts.query.readByName(param)];
  }
);

export default function Page({ circle, user }: ServerProps) {
  useAppDispatch()(setUser(user));

  return (
    <Layout>
      <CircleView isAdmin={!!user?.isAdmin} circle={circle} />
    </Layout>
  );
}
