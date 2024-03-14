import React from "react";

export type LegalProps = {
  children: React.ReactNode;
};

export function LegalStrong({ children }: LegalProps) {
  return <span className="font-semibold">{children}</span>;
}
