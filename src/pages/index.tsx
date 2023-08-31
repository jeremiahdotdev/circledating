"use client";

import { About } from "@/views/About/About";
import Animation from "../../public/animation";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Animation />
      <About />
    </main>
  );
}
