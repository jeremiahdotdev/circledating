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
import classNames from "classnames";

interface DatepickerFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

export const DatepickerFormField = <Values extends FieldValues>({
  label,
  description,
  required,
  className,
  ...props
}: DatepickerFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className={classNames("mb-2 flex w-full flex-col", className)}>
      {!!label && (
        <FormLabel>
          {label}
          <RequiredAsterisk required={required} />
        </FormLabel>
      )}
      <FormControl>
        <DatePicker label={label ?? ""} {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
