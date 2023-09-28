import { Logo } from "./Logo";
import { NavActivePageHeader } from "./NavActivePageHeader";
import { NavButton } from "./NavButton";
import { NavButtonList, SheetData } from "./NavButtonList";
import { NavMenuMobile } from "./NavMenuMobile";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "@/globals/routes";
import React, { useMemo } from "react";

export type NavProps = {
  isAuthed?: boolean;
  isActive?: boolean;
  username: string;
  circles: ReadCircleSchemaType[];
  preferences: ReadUserPreferencesSchemaType;
};

export function Nav({
  isAuthed,
  isActive,
  username,
  circles,
  preferences,
}: NavProps) {
  const renderButtonList = useMemo(() => {
    if (isActive) {
      return (
        <NavButtonList
          preferences={preferences}
          circles={circles}
          username={username}
        />
      );
    } else {
      return <NavButton option={routes.logout()} />;
    }
  }, [isActive, circles, preferences, username]);
  return (
    <nav className="z-50 flex h-header w-full border-gray-200 bg-white shadow-md dark:bg-gray-900 sm:fixed">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 p-4 md:grid-cols-2 ">
        <RouteOptionLink
          option={routes.default()}
          className="flex items-center justify-start"
        >
          <Logo className="hidden sm:flex" />
        </RouteOptionLink>
        <div className="flex items-center justify-center md:hidden">
          <NavActivePageHeader />
        </div>
        <div className="flex items-center justify-end">
          {isAuthed && (
            <>
              <NavMenuMobile>{renderButtonList}</NavMenuMobile>
              <div className="hidden w-full md:block md:w-auto">
                {renderButtonList}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
