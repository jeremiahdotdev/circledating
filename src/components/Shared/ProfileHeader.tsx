import { IconButton } from "./IconButton";
import { IconButtonVariant } from "@/schemas/Button";
import { ProfilePicture } from "../Profile/ProfilePicture";
import AvatarUpload from "../Avatar/AvatarUpload";
import React from "react";

export type ProfileHeaderProps = {
  header: string;
  url?: string | undefined;
  image?: string;
  canEdit?: boolean;
  handleUpdateImage?: (image: string) => void;
  qr?: React.ReactNode;
};

export function ProfileHeader({
  header,
  image,
  canEdit,
  qr,
  handleUpdateImage,
}: ProfileHeaderProps) {
  return (
    <div className="mx-2 flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
      <div className="relative aspect-square w-3/4 flex-col justify-center sm:w-1/3">
        <ProfilePicture
          src={image}
          fallback={header.substring(0, 1)}
          alt={header + "_profile"}
          className="text-4xl md:m-2"
        />
        {canEdit && handleUpdateImage && (
          <span className="absolute bottom-0 right-0">
            <IconButton
              variant={IconButtonVariant.UPLOAD}
              dialogContent={<AvatarUpload imageHandler={handleUpdateImage} />}
            />
          </span>
        )}
        {!!qr && (
          <span className="absolute bottom-0 left-0">
            <IconButton variant={IconButtonVariant.SHARE} dialogContent={qr} />
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
