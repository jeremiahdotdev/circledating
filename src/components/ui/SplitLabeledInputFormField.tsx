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

interface SplitLabeledInputFormField<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  inlineLabel1: string;
  inlineLabel2: string;
  description?: string;
  placeholder?: string;
  labelPosition?: "left" | "right";
  type?: "number" | "text";
}

export const SplitLabeledInputFormField = <Values extends FieldValues>(
  props: SplitLabeledInputFormField<Values>
) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl></FormControl>
      <span className="mb-2 flex">
        <LabeledInput
          placeholder={props.placeholder ?? props.label}
          {...field}
          type={props.type ?? "text"}
          labelPosition={props.labelPosition ?? "left"}
          inlineLabel={props.inlineLabel1}
        />
        <LabeledInput
          placeholder={props.placeholder ?? props.label}
          {...field}
          type={props.type ?? "text"}
          labelPosition={props.labelPosition ?? "left"}
          inlineLabel={props.inlineLabel2}
        />
      </span>
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
};
