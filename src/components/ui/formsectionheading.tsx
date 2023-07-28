import { memo } from "react";

export type FormSectionHeadingProps = {
  children: string;
};

export const FormSectionHeading = memo(
  ({ children }: FormSectionHeadingProps) => {
    return (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-2 mt-4">
        {children}
      </h2>
    );
  }
);
