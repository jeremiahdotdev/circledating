"use client";
import { RouteOption } from "@/globals/routes";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import classNames from "classnames";

export type NavButtonProps = {
  className?: string;
  option: RouteOption;
  bubble?: number;
};

export function NavButton({ option, className, bubble }: NavButtonProps) {
  const isActive = usePathname() === option.href;

  return (
    <li className="flex list-none">
      <RouteOptionLink
        option={option}
        className={cn(
          "relative block py-2 md:p-0 text-center whitespace-nowrap",
          classNames({
            "bg-cyan-300 text-white dark:text-white md:bg-transparent md:text-cyan-300 md:dark:text-cyan-100":
              isActive,
            "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0  md:hover:bg-transparent md:hover:text-cyan-300 md:dark:hover:bg-transparent md:dark:hover:text-cyan-100":
              !isActive,
          }),
          className
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {option.label}
        {bubble ? (
          <div className="absolute -right-2 -top-2 m-auto aspect-square w-4 rounded-full bg-purple-600 text-xs text-white">
            {bubble}
          </div>
        ) : (
          <></>
        )}
      </RouteOptionLink>
    </li>
  );
}
