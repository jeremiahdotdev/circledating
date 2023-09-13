import { FormSectionHeading } from "./FormSectionHeading";
import { memo } from "react";
import React from "react";

export type FormSectionProps = {
  heading: string;
  children: React.ReactNode | React.ReactNode[];
};

export const FormSection = memo(({ heading, children }: FormSectionProps) => {
  return (
    <>
      <FormSectionHeading>{heading}</FormSectionHeading>
      <section className="flex flex-col gap-2 sm:mx-8">{children}</section>
    </>
  );
});
