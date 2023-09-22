import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { systemMessages } from "@/globals/systemMessages";
import React from "react";

export type ConfirmActionProps = {
  children?: React.ReactNode;
  actionConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  actionCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  description?: string;
  open?: boolean;
};
export function ConfirmAction({
  children,
  title,
  description,
  open,
  actionConfirm,
  actionCancel,
}: ConfirmActionProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? systemMessages.CONFIRM_ACTION_TITLE}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? systemMessages.CONFIRM_ACTION_DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={actionCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
