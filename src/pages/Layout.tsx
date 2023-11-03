import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav/Nav";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export type LayoutProps = {
  nav?: NavProps;
  children: React.ReactNode[] | React.ReactNode;
};
export type NavProps = {
  isActive: boolean;
  isAuthed: boolean;
  isAdmin: boolean;
  username: string;
  notifications?: number;
  preferences?: ReadUserPreferencesSchemaType | undefined;
  circles?: ReadCircleSchemaType[] | undefined;
};

export default function Layout({
  nav,
  children,
}: LayoutProps): React.ReactElement {
  return (
    <>
      <Nav
        isAuthed={nav?.isAuthed}
        isActive={nav?.isActive}
        username={nav?.username ?? ""}
        preferences={nav?.preferences}
        circles={nav?.circles}
        notifications={nav?.notifications}
      />
      <main className={classNames("sm:pt-[67px]", inter.className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
