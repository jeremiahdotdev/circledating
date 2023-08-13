import { Dropdown, DropdownSelectOption } from "./dropdown";
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
import React, { useCallback, useMemo } from "react";

interface DropdownFormFieldProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  label: string;
  options: DropdownSelectOption[];
  description?: string;
  type?: "text" | "number";
  override?: string;
}

export const DropdownFormField = <Values extends FieldValues>({
  label,
  options,
  description,
  override,
  type = "text",
  ...props
}: DropdownFormFieldProps<Values>) => {
  const { field, fieldState } = useController(props);
  console.log(override);
  const correctedValue = useMemo(() => {
    if (type === "text") {
      return field.value as string;
    } else if (type === "number") {
      return String(field.value);
    }
  }, [field.value, type]);

  const onChange = useCallback(
    (value: string) => {
      if (type === "text") {
        field.onChange(value);
      } else if (type === "number") {
        field.onChange(Number(value));
      }
    },
    [field, type]
  );

  return (
    <FormItem className="mb-2 flex flex-col">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Dropdown
          label={label}
          options={options}
          {...field}
          onChange={onChange}
          value={override ?? correctedValue}
          override={override}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
