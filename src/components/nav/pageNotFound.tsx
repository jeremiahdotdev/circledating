"use client";
import React from "react";

export type PageNotFoundProps = {
  error?: string;
};
export function PageNotFound({
  error = "Hmmm... Nothing seems to be here",
}: PageNotFoundProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center self-center">
      <h1 className="pb-16 font-bold">{error}</h1>
    </div>
  );
}
