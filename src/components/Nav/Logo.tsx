import { LogoIcon } from "./LogoIcon";
import React from "react";
import classNames from "classnames";

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center justify-center">
      <LogoIcon />
      <span
        className={classNames(
          "whitespace-nowrap px-2 text-2xl font-semibold dark:text-white text-shadow-xs",
          className
        )}
      >
        CircleDating
      </span>
    </div>
  );
}
