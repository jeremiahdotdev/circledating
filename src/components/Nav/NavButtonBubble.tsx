"use client";
import React from "react";

export type NavButtonBubbleProps = {
  bubble: number;
};

export function NavButtonBubble({ bubble }: NavButtonBubbleProps) {
  return (
    <div className="absolute -right-2 -top-2 m-auto aspect-square w-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-xs text-white">
      {bubble}
    </div>
  );
}
