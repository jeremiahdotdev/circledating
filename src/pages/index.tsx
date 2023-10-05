import { HomeView } from "@/views/HomeView/HomeView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireNoAuth } from "@/helpers/requireNoAuth";
import Layout from "./Layout";
import React from "react";

export const getServerSideProps = requireNoAuth(defaultAuthProps);

export default function Page() {
  return (
    <Layout>
      <HomeView />
    </Layout>
  );
}
