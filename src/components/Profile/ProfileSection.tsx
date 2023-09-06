import React from "react";

export type ProfileSectionProps = {
  children: React.ReactNode;
};

export function ProfileSection({ children }: ProfileSectionProps) {
  return (
    <div className="flex h-full w-full rounded-md bg-background p-6 shadow-outter-soft">
      {children}
    </div>
  );
}
