import { HelpView } from "@/views/HelpView/HelpView";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type HelpServerProps = {
  user: UserSlice;
};

export const getServerSideProps = insistOn({});

export default function Page({ user }: HelpServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <HelpView />
    </Layout>
  );
}
