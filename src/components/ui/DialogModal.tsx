import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export type DialogModalProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  className?: string;
  setOpen: (value: boolean) => void;
};
export function DialogModal({
  children,
  title,
  description,
  open,
  className,
  setOpen,
}: DialogModalProps) {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className={className ?? "sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
