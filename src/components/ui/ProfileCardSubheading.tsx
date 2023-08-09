import { memo } from "react";
import React from "react";

export type ProfileCardSubheadingProps = {
  title: string;
};

export const ProfileCardSubheading = memo(
  ({ title }: ProfileCardSubheadingProps) => {
    return <span className="text-sm text-slate-950 sm:hidden">{title}</span>;
  }
);
