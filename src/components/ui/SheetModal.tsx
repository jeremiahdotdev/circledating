import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

export type SheetModalProps = {
  trigger: JSX.Element;
  title?: string;
  description?: string;
  content?: JSX.Element;
  close?: JSX.Element;
};

export function SheetModal({
  trigger,
  title,
  description,
  content,
  close,
}: SheetModalProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="max-h-screen">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description} </SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter>
          <SheetClose asChild>{close}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
