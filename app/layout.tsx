import "./globals.css";
import { Inter } from "next/font/google";
import { Nav } from "../src/components/nav/nav";
import React from "react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CircleDating | Date within your circle",
  description: "Date within your circle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
