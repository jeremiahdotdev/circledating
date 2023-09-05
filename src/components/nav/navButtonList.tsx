import { CurrentUserPreferences } from "./CurrentUserPreferences";
import { NavButton } from "./navButton";
import { NavSheetTrigger } from "./navSheetTrigger";
import React from "react";
import state from "@/utils/user.store";

export function NavButtonList() {
  return (
    <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
      <NavButton href={"/search"} label={"Search"} />
      <NavButton href={"/matches"} label={"Matches"} />
      <NavButton
        href={"/matches?blocked=true"}
        as={"/blocked"}
        label={"Blocked"}
      />
      <NavButton
        href={`/profile/${state.currentUser.username}`}
        label={"Profile"}
      />
      <NavSheetTrigger
        label={"Filters"}
        title={"Circles & Filters"}
        content={<CurrentUserPreferences />}
      />
    </ul>
  );
}
