import { Logo } from "./Logo";
import { NavActivePageHeader } from "./NavActivePageHeader";
import { NavButton } from "./NavButton";
import { NavButtonList } from "./NavButtonList";
import { NavMenuMobile } from "./NavMenuMobile";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "@/globals/routes";
import { useAppSelector } from "@/store/hooks";
import React, { useMemo } from "react";

export function Nav() {
  const user = useAppSelector((state) => state.user);

  const renderButtonList = useMemo(() => {
    if (user.isActive) {
      return <NavButtonList />;
    } else {
      return <NavButton option={routes.logout()} />;
    }
  }, [user.isActive]);
  return (
    <nav className="z-50 flex h-header w-full border-gray-200 bg-popover shadow-xl dark:text-white sm:fixed">
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
          {user.isAuthed && (
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
