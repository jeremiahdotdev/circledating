import { Button } from "./button";
import { memo } from "react";
import React from "react";

export type FormButtonProps = {
  label?: string;
  disabled?: boolean;
};

export const FormButton = memo(({ label, disabled }: FormButtonProps) => {
  return (
    <Button className="flex w-full bg-purple-600" disabled={disabled}>
      {label ?? "Submit"}
    </Button>
  );
});
