import { CurrentUserCircles } from "../Preferences/CurrentUserCircles";
import { CurrentUserPreferences } from "../Preferences/CurrentUserPreferences";
import { NavButton } from "@/components/Nav/NavButton";
import { NavSheetTrigger } from "@/components/Nav/NavSheetTrigger";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { routes } from "@/globals/routes";
import React from "react";

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
  return (
    <ul className="mt-4 flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
      <NavButton option={routes.circles()} />
      <NavButton option={routes.search()} />
      <NavButton option={routes.matches()} bubble={notifications} />
      <NavButton option={routes.profileByUsername(username)} />
      <NavSheetTrigger
        option={routes.nowhere("Circles")}
        title={"Active Circles"}
        content={
          <CurrentUserCircles
            circles={circles}
            selectedCircles={preferences?.selectedCircles}
          />
        }
      />
      <NavSheetTrigger
        option={routes.nowhere("Filters")}
        title={"Active Filters"}
        content={<CurrentUserPreferences preferences={preferences} />}
      />
      <NavButton option={routes.logout()} />
    </ul>
  );
}
