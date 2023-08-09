import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function NavMenuMobile() {
  return (
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <FontAwesomeIcon className="h-5 w-5" icon={faBars} />
    </button>
  );
}
