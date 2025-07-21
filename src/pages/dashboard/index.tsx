import { Infographic } from "@/components/Shared/Infographic";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { systemMessages } from "@/globals/systemMessages";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type DashboardServerProps = {
  user: UserSlice;
};

export const getServerSideProps = insistOn({ user: true });

export default function Page(props: DashboardServerProps) {
  useAppDispatch()(setUser(props.user));
  return (
    <Layout>
      <Infographic
        message={
          props.user?.isNew
            ? systemMessages.GETTING_STARTED
            : systemMessages.DATING_HINTS[
                Math.floor(Math.random() * systemMessages.DATING_HINTS.length)
              ]
        }
      />
    </Layout>
  );
}
