"use client";
import { NavButtonBubble } from "./NavButtonBubble";
import { RouteOption } from "@/globals/routes";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
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
    <li className="mx-4 flex w-full list-none md:mx-0">
      <RouteOptionLink
        option={option}
        className={classNames(
          className,
          "w-full relative block py-2 md:p-0 text-center whitespace-nowrap",
          {
            "bg-cyan-300 text-white dark:text-white md:bg-transparent md:text-cyan-300 md:dark:text-cyan-100":
              isActive,
            "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-300 md:dark:hover:bg-transparent md:dark:hover:text-cyan-100":
              !isActive,
          }
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {option.label}
        {bubble ? <NavButtonBubble bubble={bubble} /> : <></>}
      </RouteOptionLink>
    </li>
  );
}
