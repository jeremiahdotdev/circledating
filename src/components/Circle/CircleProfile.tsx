import { CircleSchemaType } from "@/schemas/Circle";
import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import { ItemList } from "../Shared/ItemList";
import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";
import { ProfileLinks } from "../Shared/ProfileLinks";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ProfileSection } from "../Profile/ProfileSection";
import { SearchForm } from "./SearchForm";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { isCircle } from "../Shared/ListItem";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type CircleProfileProps = {
  circle: CircleSchemaType;
};

export function CircleProfile({ circle }: CircleProfileProps) {
  const [circleState, setCircleState] = useState(circle);
  const [searchProfileState, setSearchProfileState] = useState(
    [] as ProfileSchemaType[]
  );

  const leave = api.circles.removeUserFromCircle.useMutation();
  const join = api.circles.addUserToCircle.useMutation();
  const search = api.circles.searchCircleForUser.useMutation();

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

  const handleKick = useCallback(
    (userToKick: ProfileSchemaType | CircleSchemaType) => {
      if (!isCircle(userToKick) && userToKick.userId && circleState.id)
        leave
          .mutateAsync({
            circleId: circleState.id,
            userId: userToKick.userId,
            currentUserProfile: state.currentUser,
          })
          .then(() => {
            setSearchProfileState([
              ...searchProfileState.filter(
                (i) => i.userId !== userToKick.userId
              ),
            ]);
          })
          .catch(handleError);
    },
    [leave, circleState, setSearchProfileState, searchProfileState]
  );

  const handleSearch = useCallback(
    (searchText: string) => {
      if (circle.id)
        search
          .mutateAsync({
            circleId: circle.id,
            usernamePartial: searchText,
            currentUserProfile: state.currentUser,
          })
          .then(setSearchProfileState)
          .catch(handleError);
    },
    [search, circle]
  );

  return (
    <div className="mx-2 flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
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
        <ProfileSection heading={`About`}>
          <p>{circle.description}</p>
        </ProfileSection>
      )}
      {/* // TODO: Check if admin */}
      <ProfileSection heading={`Users`}>
        <SearchForm handleSearch={handleSearch} />
        <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
          <ItemList items={searchProfileState} deleteAction={handleKick} />
        </div>
      </ProfileSection>
    </div>
  );
}
