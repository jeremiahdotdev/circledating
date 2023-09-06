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
  label?: string;
  description?: string;
  placeholder?: string;
  type?: "number" | "text";
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputFormField = <Values extends FieldValues>(
  props: InputFormFieldProps<Values>
) => {
  const { field, fieldState } = useController(props);

  return (
    <FormItem className="flex w-full flex-col items-center ">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Input
          placeholder={props.placeholder ?? props.label}
          {...field}
          type={props.type ?? "text"}
          className={props.className}
          onChange={props.onChange}
        />
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
