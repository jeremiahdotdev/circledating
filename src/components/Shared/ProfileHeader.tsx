import { DialogModal } from "../ui/DialogModal";
import { IconButton, IconButtonVariant } from "./IconButton";
import { ProfilePicture } from "../Profile/ProfilePicture";
import AvatarUpload from "../Avatar/AvatarUpload";
import React, { useCallback, useState } from "react";

export type ProfileHeaderProps = {
  header: string;
  image?: string;
  canEdit?: boolean;
};

export function ProfileHeader({ header, image, canEdit }: ProfileHeaderProps) {
  const [openState, setOpenState] = useState(false);
  const handleOpen = useCallback(() => setOpenState(true), []);
  return (
    <div className="mx-2 flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
      <div className="relative aspect-square w-3/4 flex-col justify-center sm:w-1/3">
        <ProfilePicture
          src={image}
          fallback={header.substring(0, 1)}
          alt={header + "_profile"}
          className="text-4xl md:m-2"
        />
        {canEdit && (
          <span className="absolute bottom-0 right-0">
            <DialogModal setOpen={setOpenState} open={openState}></DialogModal>
            <IconButton
              variant={IconButtonVariant.UPLOAD}
              action={handleOpen}
            />
          </span>
        )}
      </div>
      <span className="flex items-center gap-2">
        <h1 className="flex w-full justify-center text-4xl sm:w-auto">
          {header}
        </h1>
      </span>
    </div>
  );
}
