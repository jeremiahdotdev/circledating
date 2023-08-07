import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Textarea } from "./textarea";
import { useController } from "react-hook-form";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface TextAreaFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  description?: string;
  placeholder?: string;
}

export const TextAreaFormField = <Values extends FieldValues>(
  props: TextAreaFormFieldProps<Values>
) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Textarea placeholder={props.placeholder ?? props.label} {...field} />
      </FormControl>
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
};
