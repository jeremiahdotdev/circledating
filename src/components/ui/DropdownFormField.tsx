import { Dropdown, DropdownSelectOption } from "./dropdown";
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

interface DropdownFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  options: DropdownSelectOption[];
  description?: string;
}

export const DropdownFormField = <Values extends FieldValues>(
  props: DropdownFormFieldProps<Values>
) => {
  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Dropdown label={props.label} options={props.options} />
      </FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};
