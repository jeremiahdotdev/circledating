import { CircleSchemaType } from "@/schemas/Circle";
import { IconButton, IconButtonVariant } from "@/schemas/IconButton";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileSection } from "./ProfileSection";
import { api } from "@/utils/api";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type CircleProfileProps = {
  circle: CircleSchemaType;
};

export function CircleProfile({ circle }: CircleProfileProps) {
  const leave = api.circles.removeUserFromCircle.useMutation();
  const join = api.circles.addUserToCircle.useMutation();
  const [circleState, setCircleState] = useState(circle);
  const handleJoinOrLeave = useCallback(() => {
    if (circleState?.users?.length) {
      leave
        .mutateAsync({
          circleId: circleState.id ?? "",
          userId: state.currentUser.userId,
          currentUserProfile: state.currentUser,
        })
        .then(() => {
          setCircleState({ ...circleState, users: null });
        })
        .catch(console.log);
    } else {
      join
        .mutateAsync({
          circleId: circleState.id ?? "",
          userId: state.currentUser.userId,
          currentUserProfile: state.currentUser,
        })
        .then(() => {
          setCircleState({ ...circleState, users: [{ userId: "" }] });
        })
        .catch(console.log);
    }
  }, [leave, join, circleState]);
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
        <div></div>
      </span>
      <IconButton
        variant={
          circleState?.users?.length
            ? IconButtonVariant.LEAVE
            : IconButtonVariant.JOIN
        }
        onClick={handleJoinOrLeave}
      />
      {circle.link && (
        <a className="flex w-full justify-center text-2xl font-light sm:w-auto">
          ({circle.link})
        </a>
      )}
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
      {circle.description && (
        <ProfileSection>
          <p>{circle.description}</p>
        </ProfileSection>
      )}
    </div>
  );
}
