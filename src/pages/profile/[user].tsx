import { GetServerSidePropsContext } from "next";
import { PrismaContext, PrismaParameter } from "@/server/api/types";
import { ProfileView } from "@/views/ProfileView/ProfileView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { profileScripts } from "@/server/api/prisma/profileScripts";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

type ServerProps = {
  user: UserSlice;
  profile: ReadProfileSchemaType;
};

export const getServerSideProps = insistOn(
  { user: true },
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const param = {
      ctx: prisma.ctx,
      input: routerQueryAttributeToString(ctx.query.user),
    } as PrismaParameter<string>;
    return [profileScripts.query.read(param)];
  }
);

export default function Page({ user, profile }: ServerProps) {
  useAppDispatch()(setUser(user));

  return (
    <Layout>
      <ProfileView profile={profile} />
    </Layout>
  );
}
