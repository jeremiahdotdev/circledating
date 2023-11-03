import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconButtonOption } from "@/schemas/Button";
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

export function IconToggleButton({
  variant,
  type,
  labelOverride,
  hover,
  className,
  value,
  setValue,
  activeOverride,
}: IconButtonProps) {
  const [activeState, setActiveState] = useState(false);
  const isActive =
    !activeOverride || (activeOverride === undefined && activeState);

  const handleClick = useCallback(() => {
    setActiveState((oldValue) => !oldValue);
    if (setValue) setValue(value);
  }, [setValue, value]);

  return (
    <>
      <FormattedTooltip content={labelOverride ?? variant.label}>
        <Button
          onClick={handleClick}
          className={classNames(
            className,
            "text-white rounded-full flex flex-col",
            !isActive
              ? variant.style
              : classNames(variant.style, variant.activeStyle),
            { "absolute right-5 bottom-5": hover }
          )}
          type={type ?? "button"}
        >
          <FontAwesomeIcon
            className={classNames("h-full h-full", variant.iconStyle ?? "")}
            icon={variant.icon}
          />

          {<h4 className="text-sm"> {labelOverride ?? variant.label} </h4>}
        </Button>
      </FormattedTooltip>
    </>
  );
}
