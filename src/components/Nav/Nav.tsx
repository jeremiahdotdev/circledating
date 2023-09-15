import { NavActivePageHeader } from "./NavActivePageHeader";
import { NavButtonList } from "./NavButtonList";
import { NavIcon } from "./NavIcon";
import { NavMenuMobile } from "./NavMenuMobile";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "@/globals/routes";
import React from "react";

export function Nav() {
  return (
    <nav className="z-50 flex w-full border-gray-200 bg-white shadow-md dark:bg-gray-900 sm:fixed">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 p-4 md:grid-cols-2 ">
        <RouteOptionLink
          option={routes.default()}
          className="flex items-center justify-start"
        >
          <NavIcon />
          <span className="hidden whitespace-nowrap px-2 text-2xl font-semibold dark:text-white sm:flex">
            CircleDating
          </span>
        </RouteOptionLink>
        <div className="flex items-center justify-center md:hidden">
          <NavActivePageHeader />
        </div>
        <div className="flex items-center justify-end">
          <NavMenuMobile />
          <div className="hidden w-full md:block md:w-auto">
            <NavButtonList />
          </div>
        </div>
      </div>
    </nav>
  );
}
