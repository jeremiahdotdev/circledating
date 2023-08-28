import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { cn } from "@/lib/utils";
import {
  faEnvelope,
  faHamburger,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export enum IconButtonVarient {
  MAIL = "mail",
  MESSAGE = "message",
  TRASH = "trash",
}

export type IconButtonProps = {
  label: string;
  variant: IconButtonVarient;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function IconButton({ label, variant, type, onClick }: IconButtonProps) {
  return (
    <FormattedTooltip content={label}>
      <Button
        onClick={onClick}
        className={cn(
          "w-16 h-16 text-white rounded-full shadow",
          variant === IconButtonVarient.MAIL
            ? `bg-green-600`
            : variant === IconButtonVarient.MESSAGE
            ? `bg-purple-600`
            : variant === IconButtonVarient.TRASH
            ? `bg-red-600`
            : ""
        )}
        type={type}
      >
        <FontAwesomeIcon
          className="h-full w-full"
          icon={
            variant === IconButtonVarient.MAIL
              ? faEnvelope
              : variant === IconButtonVarient.MESSAGE
              ? faPaperPlane
              : variant === IconButtonVarient.TRASH
              ? faTrashCan
              : faHamburger
          }
        />
      </Button>
    </FormattedTooltip>
  );
}
