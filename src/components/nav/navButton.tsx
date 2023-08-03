"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export type NavButtonProps = {
  className?: string;
  label: string;
  href: string;
};

export function NavButton({ label, href, className }: NavButtonProps) {
  const isActive = usePathname() === href;
  const activeClass: string =
    "block rounded bg-cyan-300 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-cyan-300 md:dark:text-lightblue-500";
  const inactiveClass: string =
    "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-cyan-300 md:dark:hover:bg-transparent md:dark:hover:text-lightblue-500";

  const activeLink = React.useCallback(
    () => (
      <Link href="#" className={cn(activeClass, className)} aria-current="page">
        {label}
      </Link>
    ),
    [className, label]
  );
  const inactiveLink = React.useCallback(
    () => (
      <Link href={href} className={cn(inactiveClass, className)}>
        {label}
      </Link>
    ),
    [className, label, href]
  );
  return <li>{isActive ? activeLink() : inactiveLink()}</li>;
}
