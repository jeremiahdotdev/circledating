import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { RadioButtonGroup, RadioButtonGroupOptions } from "./RadioButtonGroup";
import { RequiredAsterisk } from "./RequiredAsterisk";
import { useController } from "react-hook-form";
import React, { useCallback } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface RadioButtonFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  options: RadioButtonGroupOptions[];
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
  selectedValue?: string;
  type?: "string" | "boolean";
}

export const RadioButtonFormField = <Values extends FieldValues>({
  options,
  label,
  required,
  description,
  selectedValue,
  type,
  ...props
}: RadioButtonFormFieldProps<Values>) => {
  const { field, fieldState } = useController({ ...props });

  const customOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "boolean") {
        field.onChange(!!e.target.value);
      } else {
        field.onChange(e.target.value);
      }
    },
    [field, type]
  );

  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel>
        {label}
        <RequiredAsterisk required={required} />
      </FormLabel>
      <FormControl>
        <RadioButtonGroup
          options={options}
          onChange={customOnChange}
          selectedValue={selectedValue}
        />
      </FormControl>
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
      {description && <FormDescription>{description}</FormDescription>}
    </FormItem>
  );
};
