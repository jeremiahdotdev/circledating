import { GetServerSidePropsContext } from "next";
import { Infographic } from "@/components/Shared/Infographic";
import { UserSlice, setUser } from "@/store/userSlice";

import { requireUser } from "@/helpers/requireUser";
import { systemMessages } from "@/globals/systemMessages";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type DashboardServerProps = {
  user: UserSlice;
  isNew: boolean;
};

export const getServerSideProps = requireUser();

export default function Page(props: DashboardServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(props.user));
  return (
    <Layout>
      <Infographic
        message={
          props.isNew
            ? systemMessages.GETTING_STARTED
            : systemMessages.DATING_HINTS[
                Math.floor(Math.random() * systemMessages.DATING_HINTS.length)
              ]
        }
      />
    </Layout>
  );
}
