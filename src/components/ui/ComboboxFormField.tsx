import { Combobox, ComboboxOption } from "./combobox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { RequiredAsterisk } from "./RequiredAsterisk";
import { useController } from "react-hook-form";
import React from "react";
import classNames from "classnames";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface ComboBoxFormFieldProps<
  Values extends FieldValues,
  ValueType extends Values[keyof Values],
> extends UseControllerProps<Values> {
  label?: string;
  className?: string;
  options: ComboboxOption<ValueType>[];
  description?: string;
  required?: boolean;
  filterOn?: ValueType[];
  selectedValue?: ValueType;
}

export const ComboBoxFormField = <
  Values extends FieldValues,
  ValueType extends Values[keyof Values],
>(
  props: ComboBoxFormFieldProps<Values, ValueType>
) => {
  const { field, fieldState } = useController(props);
  return (
    <FormItem
      className={classNames("mb-2 flex w-full flex-col", props.className)}
    >
      {props.label && (
        <FormLabel>
          {props.label}
          <RequiredAsterisk required={props.required} />
        </FormLabel>
      )}
      <FormControl>
        <Combobox
          onSelect={field.onChange}
          options={props.options}
          filterOn={props.filterOn}
          selectedValue={field.value}
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
