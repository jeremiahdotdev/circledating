import { GetServerSidePropsContext } from "next";
import { ProfilesView } from "@/views/ProfilesView/ProfilesView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireAuth } from "@/helpers/requireAuth";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & {
  profiles: ReadProfileSchemaType[];
};

export const getServerSideProps = requireAuth(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const [{ isActive, username }, { preferences, circles }, profiles] =
      await Promise.all([
        caller.users.stats(),
        caller.preferences.read(),
        caller.profiles.readProfiles(),
      ]);

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
          preferences: preferences,
          circles: circles,
        },
        profiles: profiles,
      } as ServerProps,
    };
  }
);

export default function Page({ nav, profiles }: ServerProps) {
  return (
    <Layout nav={nav}>
      <ProfilesView profiles={profiles} />
    </Layout>
  );
}
