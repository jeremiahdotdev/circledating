"use client";

import { About } from "@/components/About/About";
import { Login } from "@/components/Login/Login";
import React, { memo } from "react";

export type HomeViewProps = Record<never, never>;

export const HomeView: React.FC<HomeViewProps> = memo(() => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex h-navless w-screen items-end justify-end bg-church-sample bg-cover">
        <div className="flex h-full w-full items-center justify-center md:w-1/2">
          <Login />
        </div>
      </div>
      <About />
    </div>
  );
});
