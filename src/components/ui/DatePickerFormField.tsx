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

export const DatepickerFormField = <Values extends FieldValues>({
  label,
  description,
}: DatepickerFormFieldProps<Values>) => {
  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <DatePicker label={label} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};
