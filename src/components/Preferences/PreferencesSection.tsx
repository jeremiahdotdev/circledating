import React from "react";

export type PreferencesSectionProps = {
  name: string;
  children: React.ReactNode;
};

export function PreferencesSection({
  children,
  name,
}: PreferencesSectionProps) {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <h2 className="font-bold">{name}</h2>
      {children}
    </div>
  );
}
