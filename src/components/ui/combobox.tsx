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
import React, { useCallback, useMemo, useState } from "react";

export type ComboboxOption<ComboBoxType> = {
  value: ComboBoxType;
  label: string;
};

export type ComboboxProps<ComboBoxType> = {
  name: string;
  options: ComboboxOption<ComboBoxType>[];
  onSelect?: (value: ComboBoxType | undefined) => void;
  filterOn?: ComboBoxType[];
};

export function Combobox<ComboBoxType>({
  name,
  options,
  filterOn,
  onSelect,
}: ComboboxProps<ComboBoxType>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ComboBoxType | undefined>(undefined);

  const handleSelect = useCallback(
    (currentLabel: string) => {
      const currentValue = options.find((option) => {
        return option.label.toLowerCase() === currentLabel;
      })?.value;
      setValue(currentValue);
      if (onSelect) onSelect(currentValue ?? undefined);
      setOpen(false);
    },
    [onSelect, options]
  );

  const filteredOptions = useMemo(() => {
    let result = options;

    if (filterOn && filterOn.length) {
      result = options.filter((option) => filterOn.includes(option.value));
    }
    return result;
  }, [options, filterOn]);

  const renderedOptions = useMemo(() => {
    return filteredOptions.map((option: ComboboxOption<ComboBoxType>) => (
      <CommandItem key={option.label} onSelect={handleSelect}>
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === option.value ? "opacity-100" : "opacity-0"
          )}
        />
        {option.label}
      </CommandItem>
    ));
  }, [filteredOptions, handleSelect, value]);

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
            ? filteredOptions.find((option) => {
                return option.value === value;
              })?.label
            : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command className="max-h-[400px]">
          <CommandInput placeholder={"Search..."} />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup>{renderedOptions}</CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
