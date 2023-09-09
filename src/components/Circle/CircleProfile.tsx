import { CircleWithAggregatesSchemaType } from "@/schemas/Circle";
import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import { ItemList, ItemType, ParseItem } from "../Shared/ItemList";
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
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type CircleProfileProps = {
  circle: CircleWithAggregatesSchemaType;
};

export function CircleProfile({ circle }: CircleProfileProps) {
  const router = useRouter();
  const [circleState, setCircleState] = useState(circle);
  const [searchProfileState, setSearchProfileState] = useState(
    [] as ProfileSchemaType[]
  );
  const [requestingProfileState, setRequestingProfileState] = useState(
    circle.requests ?? []
  );
  const leave = api.circles.removeUserFromCircle.useMutation();
  const join = api.circles.addUserToCircle.useMutation();
  const request = api.circles.requestToJoinCircle.useMutation();
  const remove = api.circles.denyRequestToJoinCircle.useMutation();
  const search = api.circles.searchCircleForUser.useMutation();

  const isMember = circleState?.users?.length;
  const isPrivate = true;

  const circlePayload = useCallback(
    (userId: string) => ({
      circleId: circleState.id,
      userId: userId,
      currentUserProfile: state.currentUser,
    }),
    [circleState]
  );

  const handleJoinOrLeaveOrRequest = useCallback(async () => {
    const service = !isMember ? (isPrivate ? request : join) : leave;

    await service.mutateAsync(circlePayload(state.currentUser.userId));
    setCircleState({
      ...circleState,
      users: isMember ? null : [{ userId: "" }],
    });
  }, [circleState, leave, join, request, isPrivate, isMember, circlePayload]);

  const handleKick = useCallback(
    async (userIdItem: ItemType) => {
      await leave.mutateAsync(circlePayload(userIdItem.value));
      setSearchProfileState([
        ...searchProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [leave, circlePayload, setSearchProfileState, searchProfileState]
  );

  const handleDeny = useCallback(
    async (userIdItem: ItemType) => {
      await remove.mutateAsync(circlePayload(userIdItem.value));
      setRequestingProfileState([
        ...requestingProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [remove, circlePayload, setRequestingProfileState, requestingProfileState]
  );

  const handleAccept = useCallback(
    async (userIdItem: ItemType) => {
      await join.mutateAsync(circlePayload(userIdItem.value));
      // removes the request
      await remove.mutateAsync(circlePayload(userIdItem.value));
      setSearchProfileState([
        ...searchProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [join, remove, circlePayload, setSearchProfileState, searchProfileState]
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

  const handleRoute = useCallback(
    (userIdItem: ItemType) => {
      router
        .push(routes.profileByUsername(userIdItem.label).href)
        .catch(handleError);
    },
    [router]
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
        variant={
          !isMember
            ? isPrivate
              ? IconButtonVariant.REQUEST
              : IconButtonVariant.JOIN
            : IconButtonVariant.LEAVE
        }
        onClick={handleJoinOrLeaveOrRequest}
      />
      {circle.links && <ProfileLinks links={circle.links} />}
      <div className="flex md:flex-row">
        <ProfileAttribute
          option={ProfileAttributeOptions.memberCount}
          attribute={circle?._count?.users ?? 0}
          variant={ProfileAttributeVariant.PROFILE}
        />
        <ProfileAttribute
          option={ProfileAttributeOptions.foundedOn}
          attribute={circle?.createdAt}
          variant={ProfileAttributeVariant.PROFILE}
        />
        {circle.links?.map(({ href, id }) => {
          return (
            <ProfileAttribute
              key={id}
              option={ProfileAttributeOptions.link}
              attribute={href}
              variant={ProfileAttributeVariant.PROFILE}
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
          <ItemList
            items={searchProfileState.map(ParseItem)}
            clickAction={handleRoute}
            deleteAction={handleKick}
          />
        </div>
      </ProfileSection>
      {/* // TODO: Check if admin */}
      <ProfileSection heading={`Requests`}>
        <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
          <ItemList
            items={requestingProfileState.map(ParseItem)}
            clickAction={handleRoute}
            deleteAction={handleDeny}
            createAction={handleAccept}
          />
        </div>
      </ProfileSection>
    </div>
  );
}
