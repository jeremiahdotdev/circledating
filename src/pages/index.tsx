"use client";

import { HomeView } from "@/views/HomeView/HomeView";
import { defaultAuthProps } from "@/helpers/defaultAuthProps";
import { requireNoAuth } from "@/helpers/requireNoAuth";

export const getServerSideProps = requireNoAuth(defaultAuthProps);
export default HomeView;
