import React from "react";

export type LegalProps = {
  children: React.ReactNode;
};

export function LegalBody({ children }: LegalProps) {
  return <div className="my-2">{children}</div>;
}
