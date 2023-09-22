import { CurrentUserCircles } from "../Preferences/CurrentUserCircles";
import { CurrentUserPreferences } from "../Preferences/CurrentUserPreferences";
import { NavButton } from "@/components/Nav/NavButton";
import { NavSheetTrigger } from "@/components/Nav/NavSheetTrigger";
import { routes } from "@/globals/routes";
import React from "react";
import state from "@/utils/user.store";

export function NavButtonList() {
  return (
    <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
      <NavButton option={routes.circles()} />
      <NavButton option={routes.search()} />
      <NavButton option={routes.matches()} />
      <NavButton
        option={routes.profileByUsername(state.currentUser.username)}
      />
      <NavSheetTrigger
        option={routes.nowhere("Circles")}
        title={"Active Circles"}
        content={<CurrentUserCircles />}
      />
      <NavSheetTrigger
        option={routes.nowhere("Filters")}
        title={"Active Filters"}
        content={<CurrentUserPreferences />}
      />
    </ul>
  );
}
