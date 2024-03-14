import { RouteOption } from "@/globals/routes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useCallback } from "react";

export type NavSheetProps = {
  option: RouteOption;
  title?: string;
  description?: string;
  children?: JSX.Element;
  close?: JSX.Element;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export function NavSheet({
  option,
  title,
  children,
  close,
  open,
  setOpen,
}: NavSheetProps) {
  const setSheetOpen = useCallback(
    (isOpen: boolean) => {
      if (setOpen) setOpen(isOpen);
    },
    [setOpen]
  );
  return (
    <Sheet open={open} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <li className="flex w-full cursor-pointer flex-col items-center rounded py-2 hover:text-gender-accent">
          {option.label}
        </li>
      </SheetTrigger>
      <SheetContent className="max-h-screen p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>{close}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
