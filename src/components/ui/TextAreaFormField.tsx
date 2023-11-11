import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { RequiredAsterisk } from "./RequiredAsterisk";
import { Textarea } from "./textarea";
import { useController } from "react-hook-form";
import React from "react";
import classNames from "classnames";
import type { FieldValues, UseControllerProps } from "react-hook-form";

interface TextAreaFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const TextAreaFormField = <Values extends FieldValues>(
  props: TextAreaFormFieldProps<Values>
) => {
  const { field, fieldState } = useController(props);
  return (
    <FormItem
      className={classNames(
        props.className,
        "flex w-full flex-col justify-center"
      )}
    >
      {!!props.label && (
        <FormLabel>
          {props.label} <RequiredAsterisk required={props.required} />
        </FormLabel>
      )}
      <FormControl>
        <Textarea
          className="flex flex-col"
          placeholder={props.placeholder ?? props.label}
          {...field}
          value={field.value ?? ""}
          disabled={props.disabled}
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
