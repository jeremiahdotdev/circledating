"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useMemo } from "react";

export type CheckboxProps = {
  label: React.ReactNode;
  value?: string;
  checked?: boolean;
};
export type CheckboxListProps = {
  options: CheckboxProps[];
};

export function CheckboxList({ options }: CheckboxListProps) {
  const renderedOptions = useMemo(() => {
    return options.map(({ label, value, checked }) => (
      <div key={value} className="flex flex-1 items-center">
        <Checkbox
          className="h-5 w-5 rounded-full border-y"
          id={value}
          defaultChecked={checked}
        />
        <label
          htmlFor={value}
          className="w-full text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    ));
  }, [options]);
  return <div className="flex flex-col">{renderedOptions}</div>;
}
