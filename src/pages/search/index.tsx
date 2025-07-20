import { ProfilesView } from "@/views/ProfilesView/ProfilesView";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { UserSlice, setUser } from "@/store/userSlice";
import { requireUser } from "@/helpers/requireUser";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type SearchServerProps = {
  user: UserSlice;
  profiles: ReadProfileSchemaType[];
};

export const getServerSideProps = requireUser();

export default function Page({ user }: SearchServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      <ProfilesView />
    </Layout>
  );
}
