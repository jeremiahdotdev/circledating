import { Footer } from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav/Nav";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import React from "react";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export type LayoutNavProps = {
  user?: LayoutUser;
  preferences: ReadUserPreferencesSchemaType;
  circles: ReadCircleSchemaType[];
};
export type LayoutProps = {
  children: React.ReactNode[] | React.ReactNode;
};
export type LayoutUser = {
  isActive: boolean;
  isAuthed: boolean;
  isAdmin: boolean;
  username: string;
};

export default function Layout({
  user,
  preferences,
  circles,
  children,
}: LayoutProps & LayoutNavProps): React.ReactElement {
  return (
    <>
      <Nav
        isAuthed={user?.isAuthed}
        isActive={user?.isActive}
        username={user?.username ?? ""}
        preferences={preferences}
        circles={circles}
      />
      <main className={classNames("sm:pt-[67px] ", inter.className)}>
        {children}
      </main>
      <Footer />
    </>
  );
}
