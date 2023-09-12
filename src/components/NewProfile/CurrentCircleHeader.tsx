import { CircleSchemaType } from "@/schemas/Circle";
import { ProfilePicture } from "../Profile/ProfilePicture";
import React from "react";

export type CurrentCircleHeaderProps = {
  circle?: CircleSchemaType;
};
export function CurrentCircleHeader({ circle }: CurrentCircleHeaderProps) {
  return (
    <span className="flex w-full items-center gap-2 sm:px-8">
      <span className="flex h-24">
        {circle && circle.label && (
          <ProfilePicture
            // TODO : image
            fallback={circle.label.substring(0, 1)}
            alt={circle.label}
            className="text-4xl md:m-2"
          />
        )}
      </span>
      <span className="text-4xl">
        {circle?.label ? `${circle?.label} > ` : ""}Create a new account
      </span>
    </span>
  );
}
