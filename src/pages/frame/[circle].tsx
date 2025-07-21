import { GetServerSidePropsContext } from "next";
import { Loading } from "@/components/Shared/Loading";
import { PrismaContext, PrismaParameter } from "@/server/api/types";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { circleScripts } from "@/server/api/prisma/circleScripts";
import { insistOn } from "@/helpers/insistOn";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import CircleQR from "@/components/Profile/CircleQR";
import React from "react";
import classNames from "classnames";

type ServerProps = {
  circle: ReadCircleSchemaType;
  styled: boolean;
};

export const getServerSideProps = insistOn(
  { user: true },
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const getStyled = async () =>
      Promise.resolve({
        styled: ctx?.query?.card === "",
      });

    const param = {
      ctx: prisma.ctx,
      input: routerQueryAttributeToString(ctx.query.circle),
    } as PrismaParameter<string>;

    return [circleScripts.query.readByName(param), getStyled()];
  }
);

export default function Page({ circle, styled }: ServerProps) {
  if (!circle) return <Loading />;
  return (
    <main
      className={classNames("flex w-96", {
        "rounded-xl border p-4 shadow-outter": styled,
      })}
    >
      <CircleQR circle={circle} />
    </main>
  );
}
