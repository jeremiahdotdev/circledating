import { DatePicker } from "./datepicker";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface DatepickerFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  description?: string;
}

export const DatepickerFormField = <Values extends FieldValues>(
  props: DatepickerFormFieldProps<Values>
) => {
  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <DatePicker label={props.label} />
      </FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};
