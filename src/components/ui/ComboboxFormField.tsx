import { Combobox, ComboboxOption } from "./combobox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { useController } from "react-hook-form";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface ComboBoxFormFieldProps<
  Values extends FieldValues,
  ValueType extends Values[keyof Values],
> extends UseControllerProps<Values> {
  label: string;
  options: ComboboxOption<ValueType>[];
  description?: string;
}

export const ComboBoxFormField = <
  Values extends FieldValues,
  ValueType extends Values[keyof Values],
>(
  props: ComboBoxFormFieldProps<Values, ValueType>
) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Combobox
          onSelect={field.onChange}
          name={props.label}
          options={props.options}
        />
      </FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
