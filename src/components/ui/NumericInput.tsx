import { Input, InputProps } from "./input";
import { memo, useCallback } from "react";
import React from "react";

export type NumericInputProps = Omit<
  InputProps,
  "type" | "value" | "onChange"
> & {
  value: number;
  onChange: (value: number) => void;
};

export const NumericInput = memo(function NumericInput({
  onChange,
  value,
  ...props
}: NumericInputProps) {
  const correctedOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.valueAsNumber;
      if (isNaN(value)) {
        return;
      }
      onChange(value);
    },
    [onChange]
  );

  return (
    <Input
      type="number"
      {...props}
      onChange={correctedOnChange}
      value={value}
    />
  );
});
