import { CircleSchemaType } from "@/schemas/Circle";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSection } from "./ProfileSection";
import React from "react";

export type CircleProfileProps = {
  circle: CircleSchemaType;
  interact?: (
    interaction: InteractionSchemaType,
    circle: CircleSchemaType
  ) => void;
};

export function CircleProfile({ circle, interact }: CircleProfileProps) {
  return (
    <div className="mx-2 flex max-w-screen-xl flex-col items-center justify-center gap-6">
      <div className="flex w-3/4 justify-center sm:w-1/2">
        <ProfilePicture
          // TODO: Replace with actual picture.
          fallback={circle.name.substring(0, 1)}
          alt={circle.name + "_profile"}
          className="text-4xl md:m-2"
        />
      </div>
      <h1 className="flex w-full justify-center text-4xl sm:w-auto">
        {circle.label}
      </h1>
      <div className="grid sm:grid-cols-2">
        <ProfileAttribute
          option={ProfileAttributeOptions.memberCount}
          attribute={circle?._count?.users ?? 0}
          variant={ProfileAttributeVariant.LARGE}
        />
        <ProfileAttribute
          option={ProfileAttributeOptions.foundedOn}
          attribute={circle?.createdAt}
          variant={ProfileAttributeVariant.LARGE}
        />
      </div>
      <ProfileSection>
        <p>{circle.description}</p>
      </ProfileSection>
      {interact && (
        <ProfileSection>
          <h1></h1>
        </ProfileSection>
      )}
    </div>
  );
}
