"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import classNames from "classnames";

export type NavButtonProps = {
  className?: string;
  label: string;
  href: string;
};

export function NavButton({ label, href, className }: NavButtonProps) {
  const isActive = usePathname() === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block rounded py-2 pl-3 pr-4 md:p-0",
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
        {label}
      </Link>
    </li>
  );
}
