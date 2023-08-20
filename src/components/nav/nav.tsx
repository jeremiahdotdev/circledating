import { CheckboxList } from "../ui/CheckboxList";
import { NavActivePageHeader } from "./navActivePageHeader";
import { NavButton } from "./navButton";
import { NavIcon } from "./navIcon";
import { NavMenuMobile } from "./navMenuMobile";
import { NavSheetTrigger } from "./navSheetTrigger";
import Link from "next/link";
import React from "react";
import state from "@/utils/user.store";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <NavIcon />
          <span className="hidden self-center whitespace-nowrap px-2 text-2xl font-semibold dark:text-white sm:block">
            CircleDating
          </span>
        </Link>
        <NavActivePageHeader />
        <NavMenuMobile />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <NavButton href={"/search"} label={"Search"} />
            <NavSheetTrigger
              label={"Active Circles"}
              title={"Active Circles"}
              description="Enable a circle to limit your viewing content to the selected communities. Enable multiple circles to narrow your search further."
              // TODO: Replace with current user from cache!
              content={<CheckboxList options={state.currentUser.circles} />}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}
