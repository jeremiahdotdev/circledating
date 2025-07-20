import { GetServerSidePropsContext } from "next";
import { ProfilesView } from "@/views/ProfilesView/ProfilesView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type SearchServerProps = {
  user: UserSlice;
  profiles: ReadProfileSchemaType[];
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);

    const [{ isActive, username, notifications }, { preferences, circles }] =
      await Promise.all([caller.users.stats(), caller.preferences.read()]);

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          notifications: notifications,
          username: username,
          preferences: preferences,
          circles: circles,
        },
      } as SearchServerProps,
    };
  }
);

export default function Page({ user }: SearchServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <ProfilesView />
    </Layout>
  );
}
