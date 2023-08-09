import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { LabeledInput } from "./labeledInput";
import { useController } from "react-hook-form";
import React, { useCallback } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface LabeledInputFormField<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  inlineLabel: string;
  description?: string;
  placeholder?: string;
  labelPosition?: "left" | "right";
  type?: "number" | "text";
}

export const LabeledInputFormField = <Values extends FieldValues>({
  type = "text",
  labelPosition,
  inlineLabel,
  ...props
}: LabeledInputFormField<Values>) => {
  const { field, fieldState } = useController({ ...props });

  const customOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "text") {
        field.onChange(e.target.value);
      } else if (type === "number") {
        field.onChange(Number(e.target.value));
      }
    },
    [field, type]
  );

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl></FormControl>
      <LabeledInput
        placeholder={props.placeholder ?? props.label}
        {...field}
        onChange={customOnChange}
        type={type}
        labelPosition={labelPosition ?? "left"}
        inlineLabel={inlineLabel}
      />
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
};
