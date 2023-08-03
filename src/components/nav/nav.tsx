import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavButton } from "./navButton";
import { NavIcon } from "./navIcon";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center">
          <NavIcon />
          <span className="self-center whitespace-nowrap px-2 text-2xl font-semibold dark:text-white">
            CircleDating
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <FontAwesomeIcon className="h-5 w-5" icon={faHamburger} />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <NavButton href={"/"} label={"Home"} />
            <NavButton href={"/new-profile"} label={"New Profile"} />
            <NavButton href={"/profiles"} label={"Profiles"} />
          </ul>
        </div>
      </div>
    </nav>
  );
}
