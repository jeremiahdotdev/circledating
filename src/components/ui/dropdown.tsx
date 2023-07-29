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

export function Dropdown(props: {
  placeholder?: string;
  options: DropdownSelectOption[];
}) {
  const renderedOptions = useMemo(
    () =>
      props.options.map((option) => (
        <SelectItem key={option.label} value={option.value}>
          {option.label}
        </SelectItem>
      )),
    [props.options]
  );

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{renderedOptions}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
