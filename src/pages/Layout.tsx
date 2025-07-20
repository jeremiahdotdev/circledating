import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav/Nav";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode;
};

export default function Layout({ children }: LayoutProps): React.ReactElement {
  return (
    <>
      <Nav />
      <main className={classNames(`sm:pt-[67px]`, inter.className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
