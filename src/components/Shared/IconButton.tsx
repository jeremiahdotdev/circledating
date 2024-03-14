import { Button } from "@/components/ui/button";
import { ConfirmAction } from "../ui/ConfirmAction";
import { DialogModal } from "../ui/DialogModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconButtonOption } from "@/schemas/Button";
import { handleError } from "@/utils/handleError";
import React, { useCallback, useState } from "react";
import classNames from "classnames";

export type IconButtonProps = {
  variant: IconButtonOption;
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
}: IconButtonProps) {
  const [dialogContentState, setDialogContentState] = useState(false);
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const [disabledState, setDisabledState] = useState(false);

  const enableButton = useCallback(() => {
    setDisabledState(false);
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
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
    [dialogContent, action, onClick, confirmationRequired, enableButton]
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
      <FormattedTooltip
        content={labelOverride ?? variant.label ?? variant.description ?? ""}
      >
        <Button
          onClick={handleClick}
          className={classNames(
            className,
            "text-white rounded-full flex flex-col",
            { "absolute right-5 bottom-5": hover },
            variant.style
          )}
          type={type ?? "button"}
          disabled={disabled || disabledState}
        >
          <FontAwesomeIcon className="h-full w-full" icon={variant.icon} />

          {variant.showLabel && (
            <h4 className="pl-2 text-lg"> {labelOverride ?? variant.label} </h4>
          )}
        </Button>
      </FormattedTooltip>
      <DialogModal
        setOpen={setDialogContentState}
        open={dialogContentState}
        className="bg-popover"
      >
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
