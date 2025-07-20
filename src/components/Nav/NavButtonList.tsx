import { CurrentUserCircles } from "../Preferences/CurrentUserCircles";
import { CurrentUserPreferences } from "../Preferences/CurrentUserPreferences";
import { NavButton } from "@/components/Nav/NavButton";
import { NavSheet } from "../ui/NavSheet";
import { routes } from "@/globals/routes";
import { useAppSelector } from "@/store/hooks";
import React, { useCallback, useState } from "react";

export function NavButtonList() {
  const [filtersState, setFiltersState] = useState(false);
  const [circlesState, setCirclesState] = useState(false);
  const setClosed = useCallback(() => {
    setFiltersState(false);
    setCirclesState(false);
  }, []);
  const { circles, preferences, username, notifications } = useAppSelector(
    (state) => state.user
  );
  return (
    <ul className="mt-4 flex w-full flex-col items-center justify-center rounded-lg border border-gray-100 bg-popover font-medium text-foreground md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
      <NavButton option={routes.circles()} />
      <NavButton option={routes.search()} />
      <NavButton option={routes.matches()} bubble={notifications} />
      {username && <NavButton option={routes.profileByUsername(username)} />}
      <NavSheet
        option={routes.nowhere("Circles")}
        title={"Active Circles"}
        open={filtersState}
        setOpen={setFiltersState}
      >
        <CurrentUserCircles circles={circles} setClosed={setClosed} />
      </NavSheet>
      <NavSheet
        option={routes.nowhere("Filters")}
        title={"Active Filters"}
        open={circlesState}
        setOpen={setCirclesState}
      >
        <CurrentUserPreferences
          preferences={preferences}
          setClosed={setClosed}
        />
      </NavSheet>
      <NavButton option={routes.logout()} />
    </ul>
  );
}
