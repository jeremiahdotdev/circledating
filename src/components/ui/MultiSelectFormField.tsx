import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { MultiSelect, MultiSelectOption } from "./multi-select";
import { ProfileAttributeType } from "@/utils/formatProfileAttribute";
import { SelectedLocationType } from "@/schemas/SelectedLocationSchema";
import React, { useCallback } from "react";

interface MultiSelectFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  options: MultiSelectOption[];
  label?: string;
  description?: string;
  override?: string;
  placeholder?: string;
  selected?: string[];
}

export const MultiSelectFormField = <Values extends FieldValues>({
  label,
  options,
  description,
  placeholder,
  selected,
  ...props
}: MultiSelectFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);

  const onChange = useCallback(
    (value: ProfileAttributeType[] | SelectedLocationType[]) => {
      field.onChange(value);
    },
    [field]
  );

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <MultiSelect
          placeholder={placeholder}
          options={options}
          {...field}
          selected={selected}
          onChange={onChange}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
