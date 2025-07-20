import { GetServerSidePropsContext } from "next";
import { PrivacyPolicyView } from "@/views/PrivacyPolicyView/PrivacyPolicyView";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type PrivacyPolicyServerProps = {
  user: UserSlice;
};
export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { ctx } = await getPrismaContext(_ctx);
  const caller = appRouter.createCaller(ctx);
  const [{ isActive, username, notifications }, { preferences, circles }] =
    await Promise.all([caller.users.stats(), caller.preferences.read()]);

  return {
    props: {
      user: {
        isAuthed: !!ctx.session,
        isActive: isActive,
        username: username,
        preferences: preferences,
        circles: circles,
        notifications: notifications,
      },
    } as PrivacyPolicyServerProps,
  };
};

export default function Page({ user }: PrivacyPolicyServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <PrivacyPolicyView />
    </Layout>
  );
}
