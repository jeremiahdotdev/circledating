import "@/globals.css";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Nav } from "@/components/nav/nav";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <Nav />
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default api.withTRPC(App);
