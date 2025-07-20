import { GetServerSidePropsContext } from "next";
import { PrismaContext, PrismaParameter } from "@/server/api/types";
import { ProfileView } from "@/views/ProfileView/ProfileView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { profileScripts } from "@/server/api/prisma/profileScripts";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & {
  profile: ReadProfileSchemaType;
};

export const getServerSideProps = requireUser(
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const param = {
      ctx: prisma.ctx,
      input: routerQueryAttributeToString(ctx.query.user),
    } as PrismaParameter<string>;
    return [profileScripts.query.read(param)];
  }
);

export default function Page({ profile }: ServerProps) {
  return (
    <Layout>
      <ProfileView profile={profile} />
    </Layout>
  );
}
