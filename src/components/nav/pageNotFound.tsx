"use client";
import React from "react";

export type NavButtonProps = {
  className?: string;
  label: string;
  href: string;
};

export function PageNotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center self-center">
      <h1 className="pb-16 font-bold">Hmmm... Nothing seems to be here.</h1>
    </div>
  );
}
