import { LoginView } from "@/views/LoginView/LoginView";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type LoginServerProps = {
  user: UserSlice;
};
export const getServerSideProps = insistOn({ noAuth: true });

export default function Page({ user }: LoginServerProps) {
  useAppDispatch()(setUser(user));

  return (
    <Layout>
      <LoginView />
    </Layout>
  );
}
