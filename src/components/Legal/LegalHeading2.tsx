import React from "react";

export type LegalProps = {
  children: React.ReactNode;
};

export function LegalHeading2({ children }: LegalProps) {
  return <div className="mt-4 flex flex-1 text-lg font-bold">{children}</div>;
}
