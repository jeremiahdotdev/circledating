import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import React from "react";

export type DropdownSelectOption = {
  value: string;
  label: string;
};

export type DropdownProps = {
  label: string;
  placeholder?: string;
  options: DropdownSelectOption[];
  onChange: (value: string) => void;
  value: string | undefined;
  override?: string;
};

export function Dropdown({
  options,
  onChange,
  value,
  placeholder,
  override,
}: DropdownProps) {
  const renderedOptions = useMemo(
    () =>
      options.map((option) => (
        <SelectItem key={option.label} value={option.value}>
          {option.label}
        </SelectItem>
      )),
    [options]
  );

  return (
    <Select onValueChange={onChange} value={value} disabled={!!override}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{renderedOptions}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
