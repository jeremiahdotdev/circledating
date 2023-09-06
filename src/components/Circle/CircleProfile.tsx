import { CircleSchemaType } from "@/schemas/Circle";
import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";
import { ProfileLinks } from "../Shared/ProfileLinks";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { ProfileSection } from "../Profile/ProfileSection";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type CircleProfileProps = {
  circle: CircleSchemaType;
};

export function CircleProfile({ circle }: CircleProfileProps) {
  const leave = api.circles.removeUserFromCircle.useMutation();
  const join = api.circles.addUserToCircle.useMutation();
  const [circleState, setCircleState] = useState(circle);
  const isMember = circleState?.users?.length;
  const handleJoinOrLeave = useCallback(() => {
    const service = isMember ? leave : join;
    service
      .mutateAsync({
        circleId: circleState.id ?? "",
        userId: state.currentUser.userId,
        currentUserProfile: state.currentUser,
      })
      .then(() => {
        setCircleState({
          ...circleState,
          users: isMember ? null : [{ userId: "" }],
        });
      })
      .catch(handleError);
  }, [leave, join, circleState, isMember]);
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
      <span className="flex items-center gap-2">
        <h1 className="flex w-full justify-center text-4xl sm:w-auto">
          {circle.label}
        </h1>
      </span>
      <IconButton
        variant={isMember ? IconButtonVariant.LEAVE : IconButtonVariant.JOIN}
        onClick={handleJoinOrLeave}
      />
      {circle.links && <ProfileLinks links={circle.links} />}
      <div className="flex md:flex-row">
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
        {circle.links?.map(({ href, id }) => {
          return (
            <ProfileAttribute
              key={id}
              option={ProfileAttributeOptions.link}
              attribute={href}
              variant={ProfileAttributeVariant.LARGE}
            />
          );
        })}
      </div>
      {circle.description && (
        <ProfileSection>
          <p>{circle.description}</p>
        </ProfileSection>
      )}
    </div>
  );
}
