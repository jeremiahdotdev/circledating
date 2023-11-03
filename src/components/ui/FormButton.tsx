import { Button } from "./button";
import { memo } from "react";
import React from "react";
import classNames from "classnames";

export type FormButtonProps = {
  className?: string;
  label?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const FormButton = memo(
  ({ className, label, disabled, onClick }: FormButtonProps) => {
    return (
      <Button
        className={classNames("flex bg-purple-600", className)}
        disabled={disabled}
        onClick={onClick}
      >
        {label ?? "Submit"}
      </Button>
    );
  }
);
