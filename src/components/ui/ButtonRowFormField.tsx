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
  filterOn?: string[];
}

export const ButtonRowFormField = <Values extends FieldValues>(
  props: ButtonRowFormFieldProps<Values>
) => {
  const { fieldState, field } = useController(props);
  if (props.filterOn && props.filterOn.length) {
    props.options = props.options.filter(
      (o) => props.filterOn?.includes(o.value)
    );
  }
  props.options.forEach((o) => {
    if (props.filterOn?.includes(o.value)) o.disabled = true;
  });
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
    <FormItem className="mb-2 flex w-full flex-col items-center justify-center gap-4">
      {props.label && (
        <FormLabel className="pb-2 text-xl">
          {props.label}
          <RequiredAsterisk required={props.required} />
        </FormLabel>
      )}
      <FormControl>
        <ButtonRow
          {...props}
          id={field.name ?? props.id}
          onUnselect={customOnUnselect}
          onSelect={customOnSelect}
          selectedValue={field.value}
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
