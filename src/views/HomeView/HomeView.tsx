"use client";

import { About } from "@/components/About/About";
import { Login } from "@/components/Login/Login";
import { SlideShow } from "@/components/Shared/SlideShow";
import { banners } from "@/globals/banners";
import { shuffle } from "@/helpers/shuffle";
import React, { memo } from "react";

export type HomeViewProps = Record<never, never>;

export const HomeView: React.FC<HomeViewProps> = memo(() => {
  return (
    <div className="flex min-h-window flex-col items-center justify-between">
      <SlideShow images={banners}>
        <div className="flex h-full w-full items-center justify-center md:w-1/2">
          <Login />
        </div>
      </SlideShow>
      <About />
    </div>
  );
});
