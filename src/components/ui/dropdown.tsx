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
  filterOn?: string[];
};

export function Dropdown({
  options,
  onChange,
  value,
  placeholder,
  filterOn,
}: DropdownProps) {
  const filteredOptions = useMemo(() => {
    let result = options;

    if (filterOn && filterOn.length) {
      result = options.filter((option) => filterOn.includes(option.value));
    }
    return result;
  }, [options, filterOn]);

  const renderedOptions = useMemo(() => {
    return filteredOptions.map((option) => (
      <SelectItem key={option.label} value={option.value}>
        {option.label}
      </SelectItem>
    ));
  }, [filteredOptions]);

  return (
    <Select
      onValueChange={onChange}
      value={filteredOptions.length === 1 ? filteredOptions[0].value : value}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{renderedOptions}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
