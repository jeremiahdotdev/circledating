import React from "react";

export type LegalProps = {
  children: React.ReactNode;
};

export function LegalList({ children }: LegalProps) {
  return <div className="mx-12 my-2">{children}</div>;
}
