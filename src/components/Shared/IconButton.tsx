import { Button } from "@/components/ui/button";
import { ConfirmAction } from "../ui/ConfirmAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  IconDefinition,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faEnvelope,
  faExclamation,
  faPaperPlane,
  faTrashCan,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import {
  faCheckCircle,
  faPenToSquare,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { handleError } from "@/utils/handleError";
import React, { useCallback, useMemo, useState } from "react";

export type IconButtonOptions = {
  icon: IconDefinition;
  style: string;
  label: string;
  showLabel?: boolean;
};

export enum IconButtonVariant {
  MAIL = "mail",
  REQUEST = "request",
  MESSAGE = "message",
  LIKE = "like",
  TRASH = "trash",
  JOIN = "join",
  LEAVE = "leave",
  REMOVE = "remove",
  ADD = "add",
  UPLOAD = "upload",
  REPORT = "report",
  EDIT = "edit",
  UPDATE = "update",
  CANCEL = "cancel",
}

export type IconButtonProps = {
  variant: IconButtonVariant;
  type?: "button" | "submit" | "reset";
  action?:
    | ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  labelOverride?: string;
  confirmationRequired?: boolean;
  className?: string;
};

export function IconButton({
  variant,
  type,
  disabled,
  labelOverride,
  confirmationRequired,
  className,
  onClick,
  action,
}: IconButtonProps) {
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const option = useMemo(() => {
    switch (variant) {
      case IconButtonVariant.MAIL:
        return {
          label: "They like you! Start a conversation.",
          icon: faEnvelope,
          style: "h-16 bg-green-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.REQUEST:
        return {
          label: "Ask to join.",
          icon: faEnvelope,
          showLabel: true,
          style: "h-12 py-3 bg-blue-600 whitespace-nowrap shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.MESSAGE:
        return {
          label: "Message",
          icon: faPaperPlane,
          style: "h-16 bg-purple-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.LIKE:
        return {
          label: "Like!",
          icon: faCheck,
          style: "h-16 bg-green-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.JOIN:
        return {
          label: "Join",
          showLabel: true,
          icon: faDoorClosed,
          style: "h-12 py-3 bg-green-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.LEAVE:
        return {
          label: "Leave",
          showLabel: true,
          icon: faDoorOpen,
          style: "h-12 py-3 bg-red-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.TRASH:
        return {
          label: "Block",
          icon: faTrashCan,
          style: "bg-red-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.ADD:
        return {
          label: "Add",
          icon: faCheck,
          style: "h-8 p-2 bg-green-600 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.UPLOAD:
        return {
          label: "Upload New Photo",
          icon: faUpload,
          style: "h-8 p-2 bg-gender-accent shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.REPORT:
        return {
          label: "Report",
          icon: faExclamation,
          style: "flex self-end h-6 w-6 p-1 bg-orange-400 shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.EDIT:
        return {
          label: "Edit",
          icon: faPenToSquare,
          style:
            "flex self-end h-6 w-6 p-1 text-gender-accent bg-transparent hover:bg-transparent shadow-none",
        } as IconButtonOptions;
      case IconButtonVariant.UPDATE:
        return {
          label: "Update",
          icon: faCheckCircle,
          style:
            "flex self-end h-6 w-6 p-1 text-gender-accent bg-transparent hover:bg-transparent shadow-none",
        } as IconButtonOptions;
      case IconButtonVariant.CANCEL:
        return {
          label: "Cancel",
          icon: faXmarkCircle,
          style:
            "flex self-end h-6 w-6 p-1 text-gender-accent bg-transparent hover:bg-transparent shadow-none",
        } as IconButtonOptions;
      default: // x
        return {
          label: "Remove",
          icon: faX,
          style: "h-8 p-2 bg-red-600 shadow-outter",
        } as IconButtonOptions;
    }
  }, [variant]);

  const enableButton = useCallback(() => {
    setDisabledState(false);
  }, []);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (action) {
        event.stopPropagation();
        if (confirmationRequired) {
          setDialogOpenState(true);
        } else {
          setDisabledState(true);
          action(event)?.then(enableButton).catch(handleError);
          enableButton();
        }
      } else if (onClick) {
        onClick(event);
      }
    },
    [setDialogOpenState, action, enableButton, confirmationRequired, onClick]
  );

  const handleConfirm = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (action) {
        event.preventDefault();
        event.stopPropagation();
        setDialogOpenState(false);
        action(event)?.then(enableButton).catch(handleError);
      }
    },
    [setDialogOpenState, action, enableButton]
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setDialogOpenState(false);
    },
    [setDialogOpenState]
  );
  return (
    <>
      <FormattedTooltip content={labelOverride ?? option.label}>
        <Button
          onClick={handleClick}
          className={cn(
            "text-white rounded-full",
            option.style,
            className,
            option.showLabel ? "" : "aspect-square"
          )}
          type={type ?? "button"}
          disabled={disabled || disabledState}
        >
          <FontAwesomeIcon className="h-full w-full" icon={option.icon} />

          {option.showLabel && (
            <h4 className="pl-2 text-lg"> {labelOverride ?? option.label} </h4>
          )}
        </Button>
      </FormattedTooltip>
      <ConfirmAction
        open={dialogOpenState}
        actionConfirm={handleConfirm}
        actionCancel={handleCancel}
      />
    </>
  );
}
