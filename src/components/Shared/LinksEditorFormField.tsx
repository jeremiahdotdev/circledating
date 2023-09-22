import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { LinkSchemaType } from "@/schemas/Link";
import { LinksEditor } from "./LinksEditor";
import React from "react";

interface LinksEditorProps<Values extends FieldValues>
  extends UseControllerProps<Values> {
  list: LinkSchemaType[];
  max?: number;
}

export const LinksEditorFormField = <Values extends FieldValues>({
  list,
  max,
  ...props
}: LinksEditorProps<Values>) => {
  const { field, fieldState } = useController({ ...props });

  return (
    <FormItem className="flex w-full flex-col">
      <FormControl>
        <LinksEditor
          max={max}
          list={list}
          setList={field.onChange}
          {...field}
        />
      </FormControl>
      {fieldState.error?.message && (
        <FormMessage>{fieldState.error?.message}</FormMessage>
      )}
    </FormItem>
  );
};
