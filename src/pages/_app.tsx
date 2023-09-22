import "@/globals.css";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Nav } from "@/components/Nav/Nav";
import { ThemeProvider } from "next-themes";
import { api } from "@/utils/api";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
    <ThemeProvider defaultTheme="boy">
      <Nav />
      <main className={classNames("sm:pt-[67px]", inter.className)}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(App);
