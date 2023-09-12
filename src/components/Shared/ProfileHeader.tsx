import { ProfilePicture } from "../Profile/ProfilePicture";
import React from "react";

export type ProfileHeaderProps = {
  header: string;
  image?: string;
};

export function ProfileHeader({ header, image }: ProfileHeaderProps) {
  return (
    <div className="mx-2 flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
      <div className="flex aspect-square w-3/4 justify-center sm:w-1/3">
        <ProfilePicture
          src={image}
          fallback={header.substring(0, 1)}
          alt={header + "_profile"}
          className="text-4xl md:m-2"
        />
      </div>
      <span className="flex items-center gap-2">
        <h1 className="flex w-full justify-center text-4xl sm:w-auto">
          {header}
        </h1>
      </span>
    </div>
  );
}
