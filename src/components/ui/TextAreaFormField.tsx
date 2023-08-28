import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { useController } from "react-hook-form";
import React from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface TextAreaFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export const TextAreaFormField = <Values extends FieldValues>(
  props: TextAreaFormFieldProps<Values>
) => {
  const { field, fieldState } = useController(props);
  return (
    <FormItem className="flex w-full flex-col justify-center">
      <FormLabel>{props.label}</FormLabel>
      <FormControl>
        <Textarea
          className={cn("flex flex-col", props.className)}
          placeholder={props.placeholder ?? props.label}
          {...field}
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
