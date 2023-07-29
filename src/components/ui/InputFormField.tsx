import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useController } from "react-hook-form";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface InputFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  description?: string;
  placeholder?: string;
  type?: "number" | "text";
}

export const InputFormField = <Values extends FieldValues>(
  props: InputFormFieldProps<Values>
) => {
  const { field } = useController(props);

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Input
          placeholder={props.placeholder ?? props.label}
          {...field}
          type={props.type ?? "text"}
        />
      </FormControl>
      <FormMessage />
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
    </FormItem>
  );
};
