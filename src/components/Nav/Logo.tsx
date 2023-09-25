import { LogoIcon } from "./LogoIcon";
import React from "react";
import classNames from "classnames";

export type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={classNames("flex", className)}>
      <LogoIcon />
      <span className="hidden whitespace-nowrap px-2 text-2xl font-semibold dark:text-white sm:flex">
        CircleDating
      </span>
    </div>
  );
}
