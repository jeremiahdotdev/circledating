import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import React, { useCallback } from "react";

export type ProfileSectionProps = {
  children: React.ReactNode;
  heading?: string;
  canEdit?: boolean;
  editMode?: boolean;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProfileSection({
  children,
  heading,
  canEdit,
  editMode,
  setEditMode,
}: ProfileSectionProps) {
  const toggleEdit = useCallback(() => {
    if (setEditMode) setEditMode((oldVal) => !oldVal);
  }, [setEditMode]);
  return (
    <div className="relative w-full">
      <div className="flex h-full w-full flex-col items-center gap-6 rounded-md bg-background p-6 shadow-outter-soft">
        {canEdit && (
          <span className="absolute right-3 top-3">
            <div className="flex">
              <IconButton
                variant={
                  editMode ? IconButtonVariant.CANCEL : IconButtonVariant.EDIT
                }
                action={toggleEdit}
              />
              {editMode && (
                <IconButton variant={IconButtonVariant.UPDATE} type="submit" />
              )}
            </div>
          </span>
        )}
        {heading && <h2 className="text-2xl">{heading}</h2>}
        {children}
      </div>
    </div>
  );
}
