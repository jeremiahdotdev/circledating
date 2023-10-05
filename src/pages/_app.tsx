import "@/globals.css";
import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "@/utils/api";
import React from "react";

interface AppPageProps {
  session: Session;
}

function _App({ Component, pageProps }: AppProps<AppPageProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="boy">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(_App);
