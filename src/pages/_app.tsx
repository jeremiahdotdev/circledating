import "@/globals.css";
import { AppProps } from "next/app";
import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { NavView } from "@/views/NavView/NavView";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "@/utils/api";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });
interface AppPageProps {
  session: Session;
}

function App({ Component, pageProps }: AppProps<AppPageProps>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="boy">
        <NavView />
        <main className={classNames("sm:pt-[67px]", inter.className)}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(App);
