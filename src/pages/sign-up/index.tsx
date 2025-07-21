import { GetServerSidePropsContext } from "next";
import { PrismaContext, PrismaParameter } from "@/server/api/types";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { SignUpView } from "@/views/SignUpView/SignUpView";
import { circleScripts } from "@/server/api/prisma/circleScripts";
import { insistOn } from "@/helpers/insistOn";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & {
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = insistOn(
  { noAuth: true },
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const code = routerQueryAttributeToString(ctx?.query?.code);
    const param = {
      ctx: prisma.ctx,
      input: code,
    } as PrismaParameter<string>;
    return code ? [circleScripts.query.readByCode(param)] : [];
  }
);

export default function Page({ circle }: ServerProps) {
  return (
    <Layout>
      <SignUpView circle={circle} />
    </Layout>
  );
}
