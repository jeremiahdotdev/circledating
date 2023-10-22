import { GetServerSidePropsContext } from "next";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { SignUpView } from "@/views/SignUpView/SignUpView";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoAuth } from "@/helpers/requireNoAuth";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & {
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = requireNoAuth(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const code = routerQueryAttributeToString(_ctx?.query?.code);
    const [{ isActive }, circle] = await Promise.all([
      caller.users.stats(),
      code ? caller.circles.readByCode(code) : null,
    ]);
    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
        },
        circle: circle,
      } as ServerProps,
    };
  }
);

export default function Page({ nav, circle }: ServerProps) {
  return (
    <Layout nav={nav}>
      <SignUpView circle={circle} />
    </Layout>
  );
}
