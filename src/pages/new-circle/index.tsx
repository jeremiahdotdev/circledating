import { NewCircleView } from "@/views/NewCircleView/NewCircleView";
import { requireUser } from "@/helpers/requireUser";
import Layout from "../Layout";
import React from "react";

export const getServerSideProps = requireUser();

export default function Page() {
  return (
    <Layout>
      <NewCircleView />
    </Layout>
  );
}
