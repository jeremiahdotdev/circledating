import { CurrentUserCircles } from "../Preferences/CurrentUserCircles";
import { CurrentUserPreferences } from "../Preferences/CurrentUserPreferences";
import { NavButton } from "@/components/Nav/NavButton";
import { NavSheetTrigger } from "@/components/Nav/NavSheetTrigger";
import { routes } from "@/globals/routes";
import { useSession } from "next-auth/react";
import React from "react";

export function NavButtonList() {
  const { data: session } = useSession();
  const currentUser = session?.user?.name ?? "";
  return (
    <ul className="mt-4 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
      <NavButton option={routes.circles()} />
      <NavButton option={routes.search()} />
      <NavButton option={routes.matches()} />
      <NavButton option={routes.profileByUsername(currentUser)} />
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
      <NavButton option={routes.logout()} />
    </ul>
  );
}
