import React from "react";

export type ProfileDescriptionProps = {
  description: string;
  isEditMode?: boolean;
  editor?: React.ReactNode;
};

export function ProfileDescription({
  description,
  isEditMode,
  editor,
}: ProfileDescriptionProps) {
  return isEditMode ? (
    <span className="w-full">{editor}</span>
  ) : (
    <p>{description}</p>
  );
}
