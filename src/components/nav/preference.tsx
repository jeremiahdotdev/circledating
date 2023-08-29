import React from "react";

export type PreferenceProps = {
  name: string;
  children: React.ReactNode;
};

export function Preference({ children, name }: PreferenceProps) {
  return (
    <div className="mx-4">
      <h3 className="font-semibold">{name}</h3>
      {children}
    </div>
  );
}
