import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconButtonOption } from "@/schemas/Button";
import React, { useCallback, useMemo, useState } from "react";
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
  isActive: boolean;
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
  isActive,
}: IconButtonProps) {
  const [activeState, setActiveState] = useState(isActive);
  const renderisActive =
    isActive ||
    !activeOverride ||
    (activeOverride === undefined && activeState);

  const handleClick = useCallback(() => {
    setActiveState((oldValue) => !oldValue);
    if (setValue) setValue(value);
  }, [setValue, value]);

  const renderedIcon = useMemo(() => {
    if (variant.svg)
      return <div className={classNames(`h-full px-2`)}>{variant.svg}</div>;
    if (variant.icon)
      return (
        <FontAwesomeIcon
          className={classNames(`h-full px-2`)}
          icon={variant.icon}
        />
      );
    return undefined;
  }, [variant]);

  return (
    <div
      className={classNames(
        variant.width,
        variant.height,
        "flex flex-col items-center gap-2"
      )}
    >
      <FormattedTooltip
        content={labelOverride ?? variant.label ?? variant.description ?? ""}
      >
        <Button
          onClick={handleClick}
          className={classNames(
            className,
            variant.width,
            variant.height,
            "aspect-square text-white rounded-full flex flex-col",
            !renderisActive
              ? variant.style
              : classNames(variant.style, variant.activeStyle),
            { "absolute right-5 bottom-5": hover }
          )}
          type={type ?? "button"}
        >
          {renderedIcon}
          <h4 className="mx-2 whitespace-nowrap text-xs">
            {labelOverride ?? variant.label}
          </h4>
        </Button>
      </FormattedTooltip>
      {!!variant.description && (
        <h5
          className={`${variant.width} ${variant.height} max-w-full text-center text-xs font-bold`}
        >
          {variant.description}
        </h5>
      )}
    </div>
  );
}
