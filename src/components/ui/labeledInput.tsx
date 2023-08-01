import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelPosition: "left" | "right";
  inlineLabel: string;
}

const LabeledInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, labelPosition, inlineLabel, ...props }, ref) => {
    const inlineLabelElement = React.useCallback(
      () => <span className={cn("px-2 pt-2", className)}>{inlineLabel}</span>,
      [className, inlineLabel]
    );

    return (
      <label
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {labelPosition === "left" && inlineLabelElement()}
        <input
          type={type}
          className={cn(
            "flex w-full h-full px-3 py-2 bg-opacity-100 border",
            className
          )}
          ref={ref}
          {...props}
        />
        {labelPosition === "right" && inlineLabelElement()}
      </label>
    );
  }
);
LabeledInput.displayName = "LabeledInput";

export { LabeledInput };
