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
import { Slider } from "./slider";
import React, { useCallback } from "react";

interface SliderFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label?: string;
  description?: string;
  override?: string;
  step?: number;
  min?: number;
  max?: number;
  className?: string;
}

export const SliderFormField = <Values extends FieldValues>({
  label,
  description,
  step,
  min,
  max,
  className,
  ...props
}: SliderFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);
  const onChange = useCallback(
    (value: number[]) => {
      field.onChange(value);
    },
    [field]
  );

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Slider
          {...field}
          onValueChange={onChange}
          step={step}
          min={min}
          max={max}
          className={className}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
