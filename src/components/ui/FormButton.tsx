import { Button } from "./button";
import { memo } from "react";
import React from "react";

export type FormButtonProps = {
  label?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FormButton = memo(
  ({ label, disabled, onClick }: FormButtonProps) => {
    return (
      <Button
        className="flex w-full bg-purple-600"
        disabled={disabled}
        onClick={onClick}
      >
        {label ?? "Submit"}
      </Button>
    );
  }
);
