import React from "react";

export type ProfileAttributeListProps = {
  children: React.ReactNode | React.ReactNode[];
};

export function ProfileAttributeList({ children }: ProfileAttributeListProps) {
  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-center gap-0">
      {children}
    </div>
  );
}
