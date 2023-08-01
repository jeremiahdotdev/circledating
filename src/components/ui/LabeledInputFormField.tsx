import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { LabeledInput } from "./labeledInput";
import { useController } from "react-hook-form";
import React from "react";
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
  type,
  labelPosition,
  inlineLabel,
  ...props
}: LabeledInputFormField<Values>) => {
  const { field } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl></FormControl>
      <LabeledInput
        placeholder={props.placeholder ?? props.label}
        {...field}
        type={type ?? "text"}
        labelPosition={labelPosition ?? "left"}
        inlineLabel={inlineLabel}
      />
      <FormMessage />
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
};
