"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React, { useMemo } from "react";

export type CheckboxProps = {
  label: string;
  value?: string;
  checked?: boolean;
};
export type CheckboxListProps = {
  options: CheckboxProps[];
};

export function CheckboxList({ options }: CheckboxListProps) {
  const renderedOptions = useMemo(() => {
    return options.map(({ label, value, checked }) => (
      <div key={value} className="flex-1 items-center space-x-2">
        <Checkbox
          className="rounded-full"
          id={value}
          defaultChecked={checked}
        />
        <label
          htmlFor={value}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    ));
  }, [options]);
  return <div className="m-2 flex flex-col gap-2">{renderedOptions}</div>;
}
