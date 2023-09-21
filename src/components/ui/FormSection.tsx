import { FormDescription } from "./form";
import { FormSectionHeading } from "./FormSectionHeading";
import { memo } from "react";
import React from "react";

export type FormSectionProps = {
  heading?: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const FormSection = memo(
  ({ heading, description, children }: FormSectionProps) => {
    return (
      <>
        <FormSectionHeading>{heading}</FormSectionHeading>
        <FormDescription>{description}</FormDescription>
        <section className="flex flex-col gap-2 py-4 sm:mx-8">
          {children}
        </section>
      </>
    );
  }
);
