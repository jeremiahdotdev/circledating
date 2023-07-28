import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Dropdown(props: { placeholder?: string; options: any }) {
  const options: any = [];
  props.options.forEach((option: { value: any; label: string }) => {
    options.push(<SelectItem value={option.value}>{option.label}</SelectItem>);
  });
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{options}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
