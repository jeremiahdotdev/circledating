import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  IconDefinition,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faEnvelope,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

export type IconButtonOptions = {
  icon: IconDefinition;
  style: string;
  label: string;
  showLabel?: boolean;
};

export enum IconButtonVariant {
  MAIL = "mail",
  MESSAGE = "message",
  LIKE = "like",
  TRASH = "trash",
  JOIN = "join",
  LEAVE = "leave",
}

export type IconButtonProps = {
  variant: IconButtonVariant;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function IconButton({
  variant,
  type,
  disabled,
  onClick,
}: IconButtonProps) {
  const option = useMemo(() => {
    switch (variant) {
      case IconButtonVariant.MAIL:
        return {
          label: "They like you! Start a conversation",
          icon: faEnvelope,
          style: "h-16 bg-green-600",
        } as IconButtonOptions;
      case IconButtonVariant.MESSAGE:
        return {
          label: "Message",
          icon: faPaperPlane,
          style: "h-16 bg-purple-600",
        } as IconButtonOptions;
      case IconButtonVariant.LIKE:
        return {
          label: "Like!",
          icon: faCheck,
          style: "h-16 bg-green-600",
        } as IconButtonOptions;
      case IconButtonVariant.JOIN:
        return {
          label: "Join",
          showLabel: true,
          icon: faDoorClosed,
          style: "h-12 py-3 bg-green-600",
        } as IconButtonOptions;
      case IconButtonVariant.LEAVE:
        return {
          label: "Leave",
          showLabel: true,
          icon: faDoorOpen,
          style: "h-12 py-3 bg-red-600",
        } as IconButtonOptions;
      default: // Trashcan
        return {
          label: "Block",
          icon: faTrashCan,
          style: "h-16 bg-red-600",
        } as IconButtonOptions;
    }
  }, [variant]);
  return (
    <FormattedTooltip content={option.label}>
      <Button
        onClick={onClick}
        className={cn(
          "text-white rounded-full shadow",
          option.style,
          option.showLabel ? "" : "aspect-square"
        )}
        type={type}
        disabled={disabled}
      >
        <FontAwesomeIcon className="h-full w-full" icon={option.icon} />
        {option.showLabel && <h4 className="pl-2 text-lg"> {option.label} </h4>}
      </Button>
    </FormattedTooltip>
  );
}
