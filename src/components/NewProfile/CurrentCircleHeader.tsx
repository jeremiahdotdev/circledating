import { CircleSchemaType } from "@/schemas/Circle";
import { ProfilePicture } from "../Profile/ProfilePicture";
import React from "react";

export type CurrentCircleHeaderProps = {
  circle?: CircleSchemaType;
};
export function CurrentCircleHeader({ circle }: CurrentCircleHeaderProps) {
  return (
    <span className="flex w-full flex-col items-center gap-2 font-semibold tracking-tight sm:px-8 ">
      <span className="text-3xl"> {circle?.label} </span>
      <span className="flex h-24 w-24">
        {circle && circle.label && (
          <ProfilePicture
            // TODO : image
            fallback={circle.label.substring(0, 1)}
            alt={circle.label}
            className="text-4xl md:m-2"
          />
        )}
      </span>
      <span className="text-3xl">- Create a New Profile -</span>
    </span>
  );
}
