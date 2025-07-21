import { HomeView } from "@/views/HomeView/HomeView";
import { insistOn } from "@/helpers/insistOn";
import Layout from "./Layout";
import React from "react";

export const getServerSideProps = insistOn({ noUser: true });

export default function Page() {
  return (
    <Layout>
      <HomeView />
    </Layout>
  );
}
