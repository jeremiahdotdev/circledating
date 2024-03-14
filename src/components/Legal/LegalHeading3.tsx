import React from "react";

export type LegalProps = {
  children: React.ReactNode;
};

export function LegalHeading3({ children }: LegalProps) {
  return (
    <div className="mt-4 flex flex-1 font-semibold underline">{children}</div>
  );
}
