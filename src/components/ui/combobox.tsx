"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";

export type ComboboxOption<ComboBoxType> = {
  value: ComboBoxType;
  label: string;
};

export function Combobox<ComboBoxType>(props: {
  name: string;
  options: ComboboxOption<ComboBoxType>[];
  onSelect?: (value: ComboBoxType | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ComboBoxType | undefined>(undefined);

  const onSelect = useCallback(
    (currentLabel: string) => {
      const currentValue = props.options.find((option) => {
        return option.label.toLowerCase() === currentLabel;
      })?.value;
      setValue(currentValue);
      if (props.onSelect) props.onSelect(currentValue ?? undefined);
      setOpen(false);
    },
    [props]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? props.options.find((option) => {
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
            {props.options.map((option: ComboboxOption<ComboBoxType>) => (
              <CommandItem key={option.label} onSelect={onSelect}>
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
