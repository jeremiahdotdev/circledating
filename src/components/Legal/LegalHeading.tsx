import React from "react";
import classNames from "classnames";

export type LegalProps = {
  children: React.ReactNode;
  className?: string;
};

export function LegalHeading({ children, className }: LegalProps) {
  return (
    <div
      className={classNames(
        "mt-4 flex flex-1 text-lg font-bold underline underline-offset-4",
        className
      )}
    >
      {children}
    </div>
  );
}
