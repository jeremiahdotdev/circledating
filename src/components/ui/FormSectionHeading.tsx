import { memo } from "react";
import React from "react";

export type FormSectionHeadingProps = {
  children: React.ReactNode;
};

export const FormSectionHeading = memo(
  ({ children }: FormSectionHeadingProps) => {
    return (
      <h2 className="mb-2 mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {children}
      </h2>
    );
  }
);
