import { GetServerSidePropsContext } from "next";
import { Infographic } from "@/components/Shared/Infographic";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { systemMessages } from "@/globals/systemMessages";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type DashboardServerProps = {
  user: UserSlice;
  isNew: boolean;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const [
      { isNew, isActive, username, notifications },
      { preferences, circles },
    ] = await Promise.all([caller.users.stats(), caller.preferences.read()]);

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
        isNew: isNew,
      } as DashboardServerProps,
    };
  }
);

export default function Page({ user, isNew }: DashboardServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <Infographic
        message={
          isNew
            ? systemMessages.GETTING_STARTED
            : systemMessages.DATING_HINTS[
                Math.floor(Math.random() * systemMessages.DATING_HINTS.length)
              ]
        }
      />
    </Layout>
  );
}
