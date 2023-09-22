/* eslint-disable react/jsx-no-bind */
"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ComboboxOption } from "./combobox";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { ProfileAttributeType } from "@/utils/formatProfileAttribute";
import { SelectedLocationType } from "@/schemas/SelectedLocationSchema";
import { X } from "lucide-react";

export type MultiSelectOption = ComboboxOption<
  // SelectedLocationType has Zod restrictions. Its not really "string"
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  ProfileAttributeType | SelectedLocationType
>;
export type MultiSelectProps = {
  options: MultiSelectOption[];
  selected?: string[];
  placeholder?: string;
  onChange?: (value: ProfileAttributeType[] | SelectedLocationType[]) => void;
};

export function MultiSelect({
  options,
  selected,
  placeholder,
  onChange,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const selectedOptions = options.filter((o) => selected?.includes(o.value));
  const [selectedState, setSelectedState] = React.useState<MultiSelectOption[]>(
    selectedOptions ?? []
  );
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = React.useCallback(
    (options: MultiSelectOption[]) => {
      setSelectedState(options);
      if (onChange) onChange(options.map((o) => o.value));
    },
    [onChange, setSelectedState]
  );
  const handleUnselect = React.useCallback(
    (option: MultiSelectOption) => {
      handleSelect(selectedState.filter((s) => s.value !== option.value));
    },
    [handleSelect, selectedState]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            handleSelect([...selectedState].slice(0, selectedState.length));
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [handleSelect, selectedState]
  );

  const selectables = options.filter(
    (option) =>
      !selectedState.map((selected) => selected.value).includes(option.value)
  );
  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const renderedBadges = React.useMemo(() => {
    return selectedState.map((option: MultiSelectOption) => {
      const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter") {
          handleUnselect(option);
        }
      };
      const onClick = () => handleUnselect(option);
      return (
        <Badge key={option.value} variant="secondary">
          {option.label}
          <button
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            onClick={onClick}
          >
            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
          </button>
        </Badge>
      );
    });
  }, [handleUnselect, onMouseDown, selectedState]);

  const onBlur = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onFocus = React.useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const renderedCommandItems = React.useMemo(() => {
    return selectables.map((option) => {
      const onSelect = () => {
        setInputValue("");
        handleSelect([...selectedState, option]);
      };
      return (
        <CommandItem
          key={option.value}
          onMouseDown={onMouseDown}
          onSelect={onSelect}
          className={"cursor-pointer"}
        >
          {option.label}
        </CommandItem>
      );
    });
  }, [onMouseDown, selectables, handleSelect, selectedState]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {renderedBadges}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder ?? "Select..."}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {renderedCommandItems}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
