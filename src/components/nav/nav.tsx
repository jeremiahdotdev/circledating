import { NavActivePageHeader } from "./navActivePageHeader";
import { NavButtonList } from "./navButtonList";
import { NavIcon } from "./navIcon";
import { NavMenuMobile } from "./navMenuMobile";
import Link from "next/link";
import React from "react";

export function Nav() {
  return (
    <nav className="z-50 border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="grid grid-cols-3 p-4">
        <Link
          href="/"
          className="flex items-center justify-start md:justify-center"
        >
          <NavIcon />
          <span className="hidden self-center whitespace-nowrap px-2 text-2xl font-semibold dark:text-white sm:block">
            CircleDating
          </span>
        </Link>
        <div className="flex items-center justify-center">
          <NavActivePageHeader />
        </div>
        <div className="flex items-center justify-end md:justify-center">
          <NavMenuMobile />
          <div className="hidden w-full md:block md:w-auto">
            <NavButtonList />
          </div>
        </div>
      </div>
    </nav>
  );
}
