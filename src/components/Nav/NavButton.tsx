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
          "w-full relative text-foreground hover:text-gender-accent block py-2 md:p-0 text-center whitespace-nowrap",
          {
            "bg-transparent": isActive,
            "md:border-0": !isActive,
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
