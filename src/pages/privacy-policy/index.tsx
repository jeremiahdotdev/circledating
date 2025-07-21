import { PrivacyPolicyView } from "@/views/PrivacyPolicyView/PrivacyPolicyView";
import { UserSlice, setUser } from "@/store/userSlice";
import { insistOn } from "@/helpers/insistOn";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type PrivacyPolicyServerProps = {
  user: UserSlice;
};
export const getServerSideProps = insistOn({});

export default function Page({ user }: PrivacyPolicyServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <PrivacyPolicyView />
    </Layout>
  );
}
