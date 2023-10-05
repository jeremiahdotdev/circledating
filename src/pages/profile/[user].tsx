import { GetServerSidePropsContext } from "next";
import { ProfileView } from "@/views/ProfileView/ProfileView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser;
  profile: ReadProfileSchemaType;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const [{ isActive, username }, { preferences, circles }, profile] =
      await Promise.all([
        caller.users.stats(),
        caller.preferences.read(),
        caller.profiles.read(routerQueryAttributeToString(_ctx.query.user)),
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
        profile: profile,
      } as ServerProps,
    };
  }
);

export default function Page({
  user,
  preferences,
  circles,
  profile,
}: ServerProps) {
  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      <ProfileView profile={profile} />
    </Layout>
  );
}
