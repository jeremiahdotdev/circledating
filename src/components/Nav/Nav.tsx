import { Logo } from "./Logo";
import { NavActivePageHeader } from "./NavActivePageHeader";
import { NavButton } from "./NavButton";
import { NavButtonList } from "./NavButtonList";
import { NavMenuMobile } from "./NavMenuMobile";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "@/globals/routes";
import React, { useMemo } from "react";

export type NavProps = {
  isAuthed?: boolean;
  isActiveUser?: boolean;
};

export function Nav({ isAuthed, isActiveUser }: NavProps) {
  const renderButtonList = useMemo(() => {
    if (isActiveUser) {
      return <NavButtonList />;
    } else {
      return <NavButton option={routes.logout()} />;
    }
  }, [isActiveUser]);
  return (
    <nav className="z-50 flex w-full border-gray-200 bg-white shadow-md dark:bg-gray-900 sm:fixed">
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 p-4 md:grid-cols-2 ">
        <RouteOptionLink
          option={routes.default()}
          className="flex items-center justify-start"
        >
          <Logo />
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
