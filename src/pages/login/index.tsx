import { GetServerSidePropsContext } from "next";
import { LoginView } from "@/views/LoginView/LoginView";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireNoAuth } from "@/helpers/requireNoAuth";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type LoginServerProps = {
  user: UserSlice;
};
export const getServerSideProps = requireNoAuth(
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
      } as LoginServerProps,
    };
  }
);

export default function Page({ user }: LoginServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <LoginView />
    </Layout>
  );
}
