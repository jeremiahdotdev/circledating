import { Form } from "../ui/form";
import { FormButton } from "../ui/FormButton";
import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import { ItemList, ItemType, ParseItem } from "../Shared/ItemList";
import { LinksEditorFormField } from "../Shared/LinksEditorFormField";
import {
  MutateCircleSchema,
  MutateCircleSchemaType,
  ReadCircleSchemaType,
} from "@/schemas/Circle";
import {
  ProfileAttribute,
  ProfileAttributeVariant,
} from "../Profile/ProfileAttribute";
import { ProfileAttributeList } from "../Shared/ProfileAttributeList";
import { ProfileAttributeOptions } from "../Profile/ProfileAttributeOptions";
import { ProfileDescription } from "../Profile/ProfileDescription";
import { ProfileHeader } from "../Shared/ProfileHeader";
import { ProfileLinks } from "../Shared/ProfileLinks";
import { ProfileSection } from "../Profile/ProfileSection";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { ReportAggregatesSchemaType } from "@/schemas/Report";
import { SearchForm } from "./SearchForm";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";

export type CircleProfileProps = {
  circle: ReadCircleSchemaType;
  canEdit?: boolean;
};

export function CircleProfile({ circle, canEdit }: CircleProfileProps) {
  const router = useRouter();

  const update = api.circles.update.useMutation();
  const report = api.reports.readAllByCircle.useMutation();
  const leave = api.circles.removeSelfFromCircle.useMutation();
  const kick = api.circles.removeUserFromCircle.useMutation();
  const join = api.circles.addSelfToCircle.useMutation();
  const add = api.circles.addUserToCircle.useMutation();
  const request = api.circles.requestToJoinCircle.useMutation();
  const remove = api.circles.denyRequestToJoinCircle.useMutation();
  const search = api.circles.searchCircleForUser.useMutation();
  const updateImage = api.circles.updateImage.useMutation();

  const [circleState, setCircleState] = useState({ ...circle });

  const [searchProfileState, setSearchProfileState] = useState(
    [] as ReadProfileSchemaType[]
  );
  const [requestingProfileState, setRequestingProfileState] = useState(
    circle.requests ?? []
  );
  const [reportedProfilesState, setReportedProfilesState] = useState(
    [] as ReportAggregatesSchemaType[]
  );
  const [editMode, setEditMode] = useState(false);

  const handleUpdateImage = useCallback(
    (imageURL: string) => {
      updateImage
        .mutateAsync({ id: circleState.id, image: imageURL })
        .then(() => {
          setCircleState({ ...circleState, image: imageURL });
        })
        .catch(handleError);
    },
    [updateImage, circleState, setCircleState]
  );

  const form = useForm<MutateCircleSchemaType>({
    resolver: zodResolver(MutateCircleSchema),
    defaultValues: {
      ...circleState,
      updatedAt: undefined,
      createdAt: undefined,
    },
  });

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: MutateCircleSchemaType) => {
      setEditMode(false);
      if (
        data.description !== circleState.description ||
        data.links !== circleState.links
      ) {
        update.mutateAsync(data).catch(handleError);
        setCircleState({
          ...circleState,
          ...data,
          updatedAt: undefined,
          createdAt: undefined,
        });
      }
    },
    [setCircleState, update, circleState]
  );

  const isMember = circleState?.users?.length;
  const isPrivate = circleState?.isPrivate;

  const handleJoinOrLeaveOrRequest = useCallback(async () => {
    const service = !isMember ? (isPrivate ? request : join) : leave;

    await service.mutateAsync(circleState.id);
    setCircleState({
      ...circleState,
      users: isMember
        ? null
        : [{ userId: "", userTitle: "PLEB", circleId: "", isSelected: true }],
    });
  }, [circleState, leave, join, request, isPrivate, isMember]);

  const handleKick = useCallback(
    async (userIdItem: ItemType) => {
      await kick.mutateAsync({
        circleId: circleState.id,
        userId: userIdItem.value,
      });
      setSearchProfileState([
        ...searchProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [kick, setSearchProfileState, searchProfileState, circleState]
  );

  const handleDeny = useCallback(
    async (userIdItem: ItemType) => {
      await remove.mutateAsync({
        circleId: circleState.id,
        userId: userIdItem.value,
      });
      setRequestingProfileState([
        ...requestingProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [remove, circleState, setRequestingProfileState, requestingProfileState]
  );

  const handleAccept = useCallback(
    async (userIdItem: ItemType) => {
      await add.mutateAsync({
        circleId: circleState.id,
        userId: userIdItem.value,
      });
      await remove.mutateAsync({
        circleId: circleState.id,
        userId: userIdItem.value,
      });
      setSearchProfileState([
        ...searchProfileState.filter((i) => i.userId !== userIdItem.value),
      ]);
    },
    [add, remove, circleState, setSearchProfileState, searchProfileState]
  );

  const handleSearch = useCallback(
    (searchText: string) => {
      if (circle.id)
        search
          .mutateAsync({
            circleId: circle.id,
            usernamePartial: searchText,
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

  const handleLoadReports = useCallback(() => {
    report
      .mutateAsync(circle.id)
      .then((response) =>
        setReportedProfilesState(response as ReportAggregatesSchemaType[])
      )
      .catch(handleError);
  }, [report, setReportedProfilesState, circle]);
  return (
    <Form
      onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      form={form}
      className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-6"
    >
      <ProfileHeader
        canEdit={canEdit}
        handleUpdateImage={handleUpdateImage}
        image={circleState.image ?? ""}
        header={circle.label}
      />
      <IconButton
        variant={
          !isMember
            ? isPrivate
              ? IconButtonVariant.REQUEST
              : IconButtonVariant.JOIN
            : IconButtonVariant.LEAVE
        }
        action={handleJoinOrLeaveOrRequest}
      />
      <ProfileAttributeList>
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
        <ProfileLinks
          links={circleState.links ?? []}
          isEditMode={editMode}
          editor={
            <LinksEditorFormField
              name="links"
              control={form.control}
              list={circleState.links ?? []}
              max={1}
            />
          }
        />
      </ProfileAttributeList>
      <ProfileSection
        heading="About"
        canEdit={canEdit}
        setEditMode={setEditMode}
        editMode={editMode}
      >
        <ProfileDescription
          description={circleState.description}
          isEditMode={editMode}
          editor={
            <TextAreaFormField name="description" control={form.control} />
          }
        />
      </ProfileSection>
      {canEdit && (
        <>
          <ProfileSection heading="Requests">
            <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
              <ItemList
                items={requestingProfileState.map(ParseItem)}
                clickAction={handleRoute}
                deleteAction={handleDeny}
                createAction={handleAccept}
              />
            </div>
          </ProfileSection>
          <ProfileSection heading="Users">
            <SearchForm handleSearch={handleSearch} />
            <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
              <ItemList
                items={searchProfileState.map(ParseItem)}
                clickAction={handleRoute}
                deleteAction={handleKick}
              />
            </div>
          </ProfileSection>
          <ProfileSection heading="Reports">
            <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
              <ItemList
                items={reportedProfilesState.map(ParseItem)}
                clickAction={handleRoute}
                deleteAction={handleKick}
              />
            </div>
            <FormButton label="Load..." onClick={handleLoadReports} />
          </ProfileSection>
        </>
      )}
    </Form>
  );
}
