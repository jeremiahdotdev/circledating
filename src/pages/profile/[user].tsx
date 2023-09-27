import { GetServerSidePropsContext } from "next";
import { Layout, LayoutUser } from "../Layout";
import { ProfileView } from "@/views/ProfileView/ProfileView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import React from "react";

type ServerProps = {
  user: LayoutUser;
  profile: ReadProfileSchemaType;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const { isActive } = await caller.users.isActive();
    const profile = await caller.profiles.readCurrent();

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
        },
        profile: profile,
      } as ServerProps,
    };
  }
);

export default function Page({ user, profile }: ServerProps) {
  return (
    <Layout user={user}>
      <ProfileView profile={profile} />
    </Layout>
  );
}
