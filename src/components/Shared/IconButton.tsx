import { Button } from "@/components/ui/button";
import { ConfirmAction } from "../ui/ConfirmAction";
import { DialogModal } from "../ui/DialogModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  IconDefinition,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faEnvelope,
  faExclamation,
  faMars,
  faMinus,
  faMoon,
  faPaperPlane,
  faPlus,
  faQrcode,
  faSave,
  faSun,
  faTrashCan,
  faUpload,
  faVenus,
  faWeightHanging,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheckCircle,
  faPenToSquare,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { handleError } from "@/utils/handleError";
import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

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
  PLUS = "plus",
  MINUS = "minus",
  SAVE = "save",
  SHARE = "share",
  MALE = "boy",
  FEMALE = "girl",
  LIGHT = "light",
  DARK = "dark",
  KG = "kg",
  LBS = "lbs",
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
  hover?: boolean;
  dialogContent?: React.ReactNode;
  value?: string;
  setValue?: (value: string | undefined) => void;
  activeOverride?: boolean;
};

export function IconButton({
  variant,
  type,
  disabled,
  labelOverride,
  hover,
  confirmationRequired,
  className,
  dialogContent,
  onClick,
  action,
  value,
  setValue,
  activeOverride,
}: IconButtonProps) {
  const [activeState, setActiveState] = useState(false);
  const isActive =
    !activeOverride || (activeOverride === undefined && activeState);
  const [dialogContentState, setDialogContentState] = useState(false);
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);

  const option = useMemo(() => {
    const subtle =
      "flex self-end h-6 w-6 p-1 text-gender-accent bg-transparent hover:bg-transparent shadow-none";
    const subtleInverted =
      "flex self-end h-5 w-5 p-1 text-gender-accent border-gender-accent bg-transparent border hover:bg-transparent shadow-none";
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
      case IconButtonVariant.SAVE:
        return {
          label: "Save",
          icon: faSave,
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
          style: subtleInverted,
        } as IconButtonOptions;
      case IconButtonVariant.EDIT:
        return {
          label: "Edit",
          icon: faPenToSquare,
          style: subtle,
        } as IconButtonOptions;
      case IconButtonVariant.UPDATE:
        return {
          label: "Update",
          icon: faCheckCircle,
          style: subtle,
        } as IconButtonOptions;
      case IconButtonVariant.CANCEL:
        return {
          label: "Cancel",
          icon: faXmarkCircle,
          style: subtle,
        } as IconButtonOptions;
      case IconButtonVariant.PLUS:
        return {
          label: "Plus",
          icon: faPlus,
          style: subtle,
        } as IconButtonOptions;
      case IconButtonVariant.MINUS:
        return {
          label: "Minus",
          icon: faMinus,
          style: subtle,
        } as IconButtonOptions;
      case IconButtonVariant.SHARE:
        return {
          label: "Share",
          icon: faQrcode,
          style: "h-8 p-2 bg-gender-accent shadow-outter",
        } as IconButtonOptions;
      case IconButtonVariant.MALE:
        return {
          label: "Male",
          icon: faMars,
          style: classNames(
            "h-20 w-20 text-boy-accent bg-background border-4 border-boy-accent p-6",
            {
              "bg-boy-accent text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      case IconButtonVariant.FEMALE:
        return {
          label: "Female",
          icon: faVenus,
          style: classNames(
            "h-20 w-20 text-girl-accent bg-background border-4 border-girl-accent p-6",
            {
              "bg-girl-accent text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      case IconButtonVariant.LIGHT:
        return {
          label: "Light Mode",
          icon: faSun,
          style: classNames(
            "h-20 w-20 text-yellow-400 bg-background border-4 border-yellow-400 p-6 shadow-outter",
            {
              "bg-yellow-400 border-yellow-400 text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      case IconButtonVariant.DARK:
        return {
          label: "Dark Mode",
          icon: faMoon,
          style: classNames(
            "h-20 w-20 text-purple-700 bg-background border-4 border-purple-700 p-6 shadow-outter",
            {
              "bg-purple-900 border-purple-900 text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      case IconButtonVariant.KG:
        return {
          label: "KG",
          icon: faWeightHanging,
          style: classNames(
            "h-20 w-20 text-red-700 bg-background border-4 border-gray-900 p-6 shadow-outter",
            {
              "bg-gray-900 border-gray-900 text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      case IconButtonVariant.LBS:
        return {
          label: "LBS",
          icon: faWeightHanging,
          style: classNames(
            "h-20 w-20 text-blue-700 bg-background border-4 border-gray-900 p-6 shadow-outter",
            {
              "bg-gray-900 border-gray-900 text-white": isActive,
            }
          ),
        } as IconButtonOptions;
      default: // x
        return {
          label: "Remove",
          icon: faX,
          style: "h-8 p-2 bg-red-600 shadow-outter",
        } as IconButtonOptions;
    }
  }, [variant, isActive]);

  const enableButton = useCallback(() => {
    setDisabledState(false);
  }, []);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setActiveState((oldValue) => !oldValue);
      if (setValue) setValue(value);

      if (dialogContent) {
        setDialogContentState(true);
      } else if (action) {
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
    [
      value,
      setValue,
      dialogContent,
      action,
      onClick,
      confirmationRequired,
      enableButton,
    ]
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
          className={classNames(
            "text-white rounded-full",
            option.style,
            className,
            { "aspect-square": !option.showLabel },
            { "absolute right-5 bottom-5": hover }
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
      <DialogModal setOpen={setDialogContentState} open={dialogContentState}>
        {dialogContent}
      </DialogModal>
      <ConfirmAction
        open={dialogOpenState}
        actionConfirm={handleConfirm}
        actionCancel={handleCancel}
      />
    </>
  );
}
