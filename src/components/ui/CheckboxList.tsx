"use client";

import { CheckboxListItem } from "./CheckboxListItem";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { FormItem, FormMessage } from "./form";
import React, { useCallback, useMemo } from "react";

export type CheckboxProps = {
  label: React.ReactNode;
  value?: string;
  checked?: boolean;
};
interface CheckboxListProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  options: CheckboxProps[];
}

export const CheckboxList = <Values extends FieldValues>({
  options,
  ...props
}: CheckboxListProps<Values>) => {
  const { field, fieldState } = useController({ ...props });

  const customOnChange = useCallback(
    (isChecked: boolean, checkBoxName: string) => {
      const fieldValueAsList = Array.isArray(field.value)
        ? field.value
        : [field.value];
      if (isChecked) {
        field.onChange([...fieldValueAsList, checkBoxName]);
      } else {
        field.onChange(fieldValueAsList.filter((v) => v !== checkBoxName));
      }
    },
    [field]
  );

  const renderedOptions = useMemo(() => {
    return options.map(({ label, value, checked }) => (
      <CheckboxListItem
        key={value}
        name={value ?? ""}
        label={label}
        isChecked={!!checked}
        onChange={customOnChange}
      />
    ));
  }, [options, customOnChange]);
  return (
    <FormItem className="flex flex-col pb-20">
      {renderedOptions}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
