"use client";

import { CheckboxListItem } from "./CheckboxListItem";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { FormItem, FormMessage } from "./form";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import React, { useCallback, useMemo } from "react";

export type CheckboxProps = {
  label: React.ReactNode;
  value?: ReadCircleSchemaType;
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
      const fieldValueAsList = Array.isArray(field.value) ? field.value : [];
      const result = isChecked
        ? [...fieldValueAsList, checkBoxName]
        : fieldValueAsList.filter((value: string) => value != checkBoxName);
      field.onChange(
        options
          .map((o) => o.value)
          .filter((v) => result.map((r) => r == v?.name))
      );
    },
    [field, options]
  );

  const renderedOptions = useMemo(() => {
    return options.map(({ label, value, checked }) => (
      <CheckboxListItem
        key={value?.name}
        name={value?.name ?? ""}
        label={label}
        isChecked={!!checked}
        onChange={customOnChange}
      />
    ));
  }, [options, customOnChange]);
  return (
    <FormItem className="mb-2 flex flex-col">
      {renderedOptions}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
