import { CirclesView } from "@/views/CirclesView/CirclesView";
import { PrismaContext } from "@/server/api/types";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { UserSlice, setUser } from "@/store/userSlice";
import { circleScripts } from "@/server/api/prisma/circleScripts";
import { requireUser } from "@/helpers/requireUser";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type CirclesServerProps = {
  user: UserSlice;
  featured: ReadCircleSchemaType[];
  current: ReadCircleSchemaType[];
};

export const getServerSideProps = requireUser((ctx: PrismaContext) => {
  return [
    circleScripts.query.readFeatured(ctx),
    circleScripts.query.readCurrent(ctx),
  ];
});

export default function Page({ user, featured, current }: CirclesServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <CirclesView featured={featured} current={current} />
    </Layout>
  );
}
