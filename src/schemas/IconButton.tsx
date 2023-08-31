import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  IconDefinition,
  faCheck,
  faEnvelope,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

export type IconButtonOptions = {
  icon: IconDefinition;
  background: string;
};

export enum IconButtonVariant {
  MAIL = "mail",
  MESSAGE = "message",
  LIKE = "like",
  TRASH = "trash",
}

export type IconButtonProps = {
  label: string;
  variant: IconButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function IconButton({
  label,
  variant,
  type,
  disabled,
  onClick,
}: IconButtonProps) {
  const option = useMemo(() => {
    switch (variant) {
      case IconButtonVariant.MAIL:
        return {
          icon: faEnvelope,
          background: "bg-green-600",
        } as IconButtonOptions;
      case IconButtonVariant.MESSAGE:
        return {
          icon: faPaperPlane,
          background: "bg-purple-600",
        } as IconButtonOptions;
      case IconButtonVariant.LIKE:
        return {
          icon: faCheck,
          background: "bg-green-600",
        } as IconButtonOptions;
      default: // Trashcan
        return {
          icon: faTrashCan,
          background: "bg-red-600",
        } as IconButtonOptions;
    }
  }, [variant]);
  return (
    <FormattedTooltip content={label}>
      <Button
        onClick={onClick}
        className={cn(
          "w-16 h-16 text-white rounded-full shadow",
          option.background
        )}
        type={type}
        disabled={disabled}
      >
        <FontAwesomeIcon className="h-full w-full" icon={option.icon} />
      </Button>
    </FormattedTooltip>
  );
}
