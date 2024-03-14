import { CurrentUserCircles } from "../Preferences/CurrentUserCircles";
import { CurrentUserPreferences } from "../Preferences/CurrentUserPreferences";
import { NavButton } from "@/components/Nav/NavButton";
import { NavSheet } from "../ui/NavSheet";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { routes } from "@/globals/routes";
import React, { useCallback, useState } from "react";

export type NavButtonListProps = {
  username: string;
  preferences?: ReadUserPreferencesSchemaType;
  circles?: ReadCircleSchemaType[];
  notifications?: number;
};

export function NavButtonList({
  preferences,
  circles,
  username,
  notifications,
}: NavButtonListProps) {
  const [filtersState, setFiltersState] = useState(false);
  const [circlesState, setCirclesState] = useState(false);
  const setClosed = useCallback(() => {
    setFiltersState(false);
    setCirclesState(false);
  }, []);
  return (
    <ul className="mt-4 flex w-full flex-col items-center justify-center rounded-lg border border-gray-100 bg-popover font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
      <NavButton option={routes.circles()} />
      <NavButton option={routes.search()} />
      <NavButton option={routes.matches()} bubble={notifications} />
      <NavButton option={routes.profileByUsername(username)} />
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
