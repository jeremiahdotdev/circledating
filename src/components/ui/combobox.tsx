"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Option = {
  value: any;
  label: string;
};

export function Combobox(props: {
  name: string;
  options: any;
  onSelect?: (value: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? props.options.find((option: any) => {
                return option.value === value;
              })?.label
            : `Select ${props.name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="max-h-[400px]">
          <CommandInput placeholder={"Search..."} />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>
            {props.options.map((option: Option) => (
              <CommandItem
                key={option.value}
                onSelect={(currentLabel) => {
                  let currentValue = props.options.find((option: any) => {
                    return option.label.toLowerCase() === currentLabel;
                  })?.value;
                  setValue(currentValue);
                  if (props.onSelect) props.onSelect(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
