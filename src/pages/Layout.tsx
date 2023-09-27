import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav/Nav";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export type LayoutProps = {
  user: LayoutUser;
  children: React.ReactNode[] | React.ReactNode;
};
export type LayoutUser = {
  isActive: boolean;
  isAuthed: boolean;
  isAdmin: boolean;
};

export default function Layout({
  user,
  children,
}: LayoutProps): React.ReactElement {
  return (
    <>
      <Nav isAuthed={user.isAuthed} isActive={user.isActive} />
      <main className={classNames("sm:pt-[67px] pb-8", inter.className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
