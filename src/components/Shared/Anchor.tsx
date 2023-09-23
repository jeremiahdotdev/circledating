import React from "react";

export type AnchorProps = {
  children: React.ReactNode;
};

export function Anchor({ children }: AnchorProps) {
  return (
    <span className="text-sm text-gray-400 hover:text-gray-600">
      {children}
    </span>
  );
}
