import { RouteOption } from "@/globals/routes";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { SheetModal } from "../ui/SheetModal";
import React from "react";

export type NavSheetTriggerProps = {
  option: RouteOption;
  trigger?: JSX.Element;
  title?: string;
  description?: string;
  content?: JSX.Element;
  close?: JSX.Element;
};

export function NavSheetTrigger({
  option,
  content,
  title,
  description,
}: NavSheetTriggerProps) {
  return (
    <li>
      <SheetModal
        trigger={
          <RouteOptionLink
            option={option}
            className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0  md:hover:bg-transparent md:hover:text-cyan-300 md:dark:hover:bg-transparent md:dark:hover:text-cyan-100"
          >
            {option.label}
          </RouteOptionLink>
        }
        title={title}
        description={description}
        content={content}
      />
    </li>
  );
}
