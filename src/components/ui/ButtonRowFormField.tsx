import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { IconButtonOption } from "@/schemas/Button";
import { RequiredAsterisk } from "./RequiredAsterisk";
import ButtonRow, { ButtonRowProps } from "./button-row";
import React, { useCallback } from "react";

export type ButtonRowOptionType = {
  variant: IconButtonOption;
  value: string;
};

export interface ButtonRowFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values>,
    ButtonRowProps {
  onSelect?: (value: string | undefined) => void;
  onUnselect?: (value: string | undefined) => void;
  label?: string;
  description?: string;
  required?: boolean;
}

export const ButtonRowFormField = <Values extends FieldValues>(
  props: ButtonRowFormFieldProps<Values>
) => {
  const { fieldState, field } = useController(props);
  const customOnSelect = useCallback(
    (value: string | undefined) => {
      field.onChange(value);
      if (props.onSelect) props.onSelect(value);
    },
    [props, field]
  );
  const customOnUnselect = useCallback(
    (value: string | undefined) => {
      field.onChange(undefined);
      if (props.onUnselect) props.onUnselect(value);
    },
    [props, field]
  );

  return (
    <FormItem className="mb-2 flex w-full flex-col items-center justify-center">
      {props.label && (
        <FormLabel className="pb-2 text-xl">
          {props.label}
          <RequiredAsterisk required={props.required} />
        </FormLabel>
      )}
      <FormControl>
        <ButtonRow
          {...props}
          onUnselect={customOnUnselect}
          onSelect={customOnSelect}
        />
      </FormControl>
      {props.description && (
        <FormDescription>{props.description}</FormDescription>
      )}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
