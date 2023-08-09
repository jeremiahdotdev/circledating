import { DatePicker } from "./datepicker";
import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import React from "react";

interface DatepickerFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  description?: string;
}

export const DatepickerFormField = <Values extends FieldValues>({
  label,
  description,
  ...props
}: DatepickerFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <DatePicker label={label} {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
