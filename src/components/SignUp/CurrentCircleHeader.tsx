import { ProfilePicture } from "../Profile/ProfilePicture";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import React from "react";

export type CurrentCircleHeaderProps = {
  circle?: ReadCircleSchemaType;
};
export function CurrentCircleHeader({ circle }: CurrentCircleHeaderProps) {
  return (
    <span className="flex w-full flex-col items-center gap-2 font-semibold tracking-tight sm:px-8 ">
      <span className="text-xl font-light"> Sign up with </span>
      <span className="flex aspect-square min-w-fit ">
        {circle && circle.label && (
          <ProfilePicture
            src={circle.image}
            fallback={circle.label.substring(0, 1)}
            alt={circle.label}
            className="aspect-square min-w-[80px] text-2xl"
          />
        )}
      </span>
      <span className="text-2xl font-normal"> {circle?.label} </span>
    </span>
  );
}
