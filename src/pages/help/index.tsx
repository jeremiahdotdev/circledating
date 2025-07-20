import { GetServerSidePropsContext } from "next";
import { HelpView } from "@/views/HelpView/HelpView";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type HelpServerProps = {
  user: UserSlice;
};
export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { ctx } = await getPrismaContext(_ctx);
  const caller = appRouter.createCaller(ctx);
  const [{ isActive, username }, { preferences, circles }] = await Promise.all([
    caller.users.stats(),
    caller.preferences.read(),
  ]);

  return {
    props: {
      user: {
        isAuthed: !!ctx.session,
        isActive: isActive,
        username: username,
        preferences: preferences,
        circles: circles,
      },
    } as HelpServerProps,
  };
};

export default function Page({ user }: HelpServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <HelpView />
    </Layout>
  );
}
