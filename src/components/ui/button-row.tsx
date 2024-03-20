import { IconButtonOption } from "@/schemas/Button";
import { IconToggleButton } from "../Shared/IconToggleButton";
import React, { useCallback, useMemo, useState } from "react";

export type ButtonRowOptionType = {
  variant: IconButtonOption;
  value: string;
  disabled?: boolean;
};

export interface ButtonRowProps {
  id?: string;
  options: ButtonRowOptionType[];
  onSelect?: (value: string | undefined) => void;
  onUnselect?: (value: string | undefined) => void;
  className?: string;
  selectedValue?: string;
}

export default function ButtonRow({
  id,
  options,
  onSelect,
  onUnselect,
  selectedValue,
}: ButtonRowProps) {
  const [valueState, setValueState] = useState<string | undefined>(() =>
    id ? undefined : ""
  );

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (valueState === value) {
        setValueState(undefined);
        if (onUnselect) onUnselect(value);
      } else {
        setValueState(value);
        if (onSelect) onSelect(value);
      }
    },
    [onUnselect, onSelect, valueState]
  );

  const renderedOptions = useMemo(
    () =>
      options.map((o) => {
        return (
          <IconToggleButton
            key={id + "-" + o.value}
            value={o.value}
            variant={o.variant}
            setValue={handleChange}
            activeOverride={valueState !== o.value}
            disabled={o.disabled}
            isActive={o.value === selectedValue}
          />
        );
      }),
    [options, id, handleChange, valueState, selectedValue]
  );
  return (
    <div className="flex w-full max-w-screen-sm flex-wrap justify-around gap-2">
      {renderedOptions}
    </div>
  );
}
