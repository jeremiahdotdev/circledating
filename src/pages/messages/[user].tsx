import { MessagesView } from "@/views/MessagesView/MessagesView";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type ServerProps = {
  user: UserSlice;
};

export const getServerSideProps = insistOn({ user: true });

export default function Page({ user }: ServerProps) {
  useAppDispatch()(setUser(user));

  return (
    <Layout>
      <MessagesView />
    </Layout>
  );
}
