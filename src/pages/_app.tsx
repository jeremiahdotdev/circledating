import "@/globals.css";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav/Nav";
import { api } from "@/utils/api";
import Head from "next/head";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg" href="/favicon.svg" />
      </Head>
      <Nav />
      <main className={classNames("sm:pt-[67px]", inter.className)}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default api.withTRPC(App);
