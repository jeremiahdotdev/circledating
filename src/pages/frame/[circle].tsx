import { GetServerSidePropsContext } from "next";
import { Loading } from "@/components/Shared/Loading";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import CircleQR from "@/components/Profile/CircleQR";
import React from "react";

type ServerProps = {
  circle: ReadCircleSchemaType;
};

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { ctx } = await getPrismaContext(_ctx);
  const caller = appRouter.createCaller(ctx);

  const circle = await caller.circles.readByName(
    routerQueryAttributeToString(_ctx.query.circle)
  );

  return {
    props: {
      circle: circle,
    } as ServerProps,
  };
};

export default function Page({ circle }: ServerProps) {
  if (!circle) return <Loading />;
  return (
    <main className="flex w-96 rounded-xl border p-4 shadow-outter">
      <CircleQR circle={circle} />
    </main>
  );
}
