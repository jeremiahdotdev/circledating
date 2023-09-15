import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { RequiredAsterisk } from "./RequiredAsterisk";
import { useController } from "react-hook-form";
import React, { useCallback } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface InputFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: "number" | "text" | "file";
  className?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputFormField = <Values extends FieldValues>(
  props: InputFormFieldProps<Values>
) => {
  const { field, fieldState } = useController(props);

  const customOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.type === "text") {
        field.onChange(e.target.value);
      } else if (props.type === "number") {
        field.onChange(Number(e.target.value));
      } else {
        field.onChange(e.target.value);
      }
      if (props.onChange) props.onChange(e);
    },
    [field, props]
  );

  return (
    <FormItem className="flex w-full flex-col">
      <FormLabel>
        {props.label}
        <RequiredAsterisk required={props.required} />
      </FormLabel>
      <FormControl>
        <Input
          placeholder={props.placeholder ?? props.label}
          {...field}
          type={props.type ?? "text"}
          className={props.className}
          onChange={customOnChange}
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
