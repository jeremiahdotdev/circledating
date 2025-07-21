import { NewCircleView } from "@/views/NewCircleView/NewCircleView";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export const getServerSideProps = insistOn({ user: true });

export type ServerProps = {
  user: UserSlice;
};

export default function Page({ user }: ServerProps) {
  useAppDispatch()(setUser(user));

  return (
    <Layout>
      <NewCircleView />
    </Layout>
  );
}
