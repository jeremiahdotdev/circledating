"use client";

import { About } from "@/views/About/About";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-church-sample h-navless w-screen bg-cover"></div>
      <About />
    </main>
  );
}
