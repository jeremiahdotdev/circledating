import "@/globals.css";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { api } from "@/utils/api";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default api.withTRPC(App);
