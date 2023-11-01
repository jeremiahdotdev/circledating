import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import React, { useCallback, useMemo, useState } from "react";

export type ButtonRowOptionType = {
  variant: IconButtonVariant;
  value: string;
};

export interface ButtonRowProps {
  options: ButtonRowOptionType[];
  onSelect?: (value: string | undefined) => void;
  onUnselect?: (value: string | undefined) => void;
  className?: string;
}

export default function ButtonRow({
  options,
  onSelect,
  onUnselect,
}: ButtonRowProps) {
  const [valueState, setValueState] = useState<string | undefined>("");
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
      options.map((o) => (
        <IconButton
          key={o.value}
          value={o.value}
          variant={o.variant}
          setValue={handleChange}
          activeOverride={valueState !== o.value}
        />
      )),
    [options, handleChange, valueState]
  );
  return <div className="flex justify-around">{renderedOptions}</div>;
}
