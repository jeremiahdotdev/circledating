import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

export type RadioButtonGroupProps = {
  options: RadioButtonGroupOptions[];
  disabled?: boolean;
  selectedValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type RadioButtonGroupOptions = {
  label: string;
  value: string;
};
export function RadioButtonGroup({
  options,
  disabled,
  selectedValue,
  onChange,
}: RadioButtonGroupProps) {
  return (
    <RadioGroup
      defaultValue="comfortable"
      className="flex gap-2"
      onChange={onChange}
    >
      {options.map(
        ({ value, label }: RadioButtonGroupOptions, index: number) => (
          <div
            key={`${label}_${index}`}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              value={value}
              id="r2"
              disabled={disabled}
              defaultChecked={selectedValue == value}
            />
            <Label htmlFor="r2">{label}</Label>
          </div>
        )
      )}
    </RadioGroup>
  );
}
