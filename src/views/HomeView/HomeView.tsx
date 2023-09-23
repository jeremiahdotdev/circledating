"use client";

import { About } from "@/views/About/About";
import React, { memo } from "react";

export type HomeViewProps = Record<never, never>;

export const HomeView: React.FC<HomeViewProps> = memo(() => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-church-sample h-navless w-screen bg-cover"></div>
      <About />
    </div>
  );
});
