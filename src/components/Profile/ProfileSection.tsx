import React from "react";

export type ProfileSectionProps = {
  children: React.ReactNode;
  heading?: string;
};

export function ProfileSection({ children, heading }: ProfileSectionProps) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6 rounded-md bg-background p-6 shadow-outter-soft">
      {heading && <h2 className="text-2xl">{heading}</h2>}
      {children}
    </div>
  );
}
