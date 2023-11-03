"use client";

import { Checkbox } from "@/components/ui/checkbox";

import React, { useCallback } from "react";

export type CheckboxListItemProps = {
  name: string;
  label: React.ReactNode;
  isChecked: boolean;
  onChange: (isChecked: boolean, name: string) => void;
};

export const CheckboxListItem = ({
  name,
  label,
  isChecked,
  onChange,
}: CheckboxListItemProps) => {
  const customOnCheckChange = useCallback(
    (e: boolean) => {
      onChange(e, name);
    },
    [name, onChange]
  );

  return (
    <div className="flex flex-1 items-center">
      <Checkbox
        className="h-5 w-5 rounded-full border-y"
        id={name}
        defaultChecked={isChecked}
        onCheckedChange={customOnCheckChange}
      />
      <label
        htmlFor={name}
        className="w-full text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};
