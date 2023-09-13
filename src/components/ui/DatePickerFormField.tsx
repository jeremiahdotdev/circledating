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
import { RequiredAsterisk } from "./RequiredAsterisk";
import React from "react";

interface DatepickerFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  description?: string;
  required?: boolean;
}

export const DatepickerFormField = <Values extends FieldValues>({
  label,
  description,
  required,
  ...props
}: DatepickerFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>
        {label}
        <RequiredAsterisk required={required} />
      </FormLabel>
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
