"use client";

import { About } from "@/components/About/About";
import { Login } from "@/components/Login/Login";
import { SlideShow } from "@/components/Shared/SlideShow";
import React, { memo } from "react";

export type HomeViewProps = Record<never, never>;

export const HomeView: React.FC<HomeViewProps> = memo(() => {
  const banners = [
    "bg-banner-0",
    "bg-banner-1",
    "bg-banner-2",
    "bg-banner-3",
    "bg-banner-4",
  ];

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
