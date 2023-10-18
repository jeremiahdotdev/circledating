import { ActivitySelectionValues } from "@/schemas/Activity";
import { ChildrenSelectionValues } from "@/schemas/Children";
import { ComboBoxFormField } from "../ui/ComboboxFormField";
import { ConsumablesSelectionValues } from "@/schemas/Consumables";
import { DrinkingSelectionValues } from "@/schemas/Drinking";
import { DropdownFormField } from "../ui/DropdownFormField";
import { Form } from "../ui/form";
import { HeightStringSelectOptions } from "@/schemas/Height";
import { IncomeSelectionValues } from "@/schemas/Income";
import { InputFormField } from "../ui/InputFormField";
import { InteractionSchemaType } from "@/schemas/Interaction";
import { ItemList, ItemType, ParseItem } from "../Shared/ItemList";
import { LevelOfEducationSelectionValues } from "@/schemas/LevelOfEducation";
import { LinksEditorFormField } from "../Shared/LinksEditorFormField";
import { LocationSchemaType } from "@/schemas/SelectedLocationSchema";
import { LocationSelectionValues } from "@/globals/location";
import { MaritalStatusesSelectionValues } from "@/schemas/MaritalStatuses";
import {
  MutateProfileSchemaType,
  ReadProfileSchema,
  ReadProfileSchemaType,
} from "@/schemas/Profile";
import { PoliticalBeliefsSelectionValues } from "@/schemas/PoliticalBeliefs";
import { ProfileActions } from "./ProfileActions";
import { ProfileAttribute, ProfileAttributeVariant } from "./ProfileAttribute";
import { ProfileAttributeList } from "../Shared/ProfileAttributeList";
import { ProfileAttributeOptions } from "./ProfileAttributeOptions";
import { ProfileCardSubheading } from "@/components/ui/ProfileCardSubheading";
import { ProfileDescription } from "./ProfileDescription";
import { ProfileHeader } from "../Shared/ProfileHeader";
import { ProfileLinks } from "../Shared/ProfileLinks";
import { ProfileLocation } from "./ProfileLocation";
import { ProfileSection } from "./ProfileSection";
import { PuritySelectionValues } from "@/schemas/Purity";
import { ReligionSelectionValues } from "@/schemas/Religion";
import { TextAreaFormField } from "../ui/TextAreaFormField";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";

export type ProfileProps = {
  profile: ReadProfileSchemaType;
  canEdit?: boolean;
  interact?: (
    interaction: InteractionSchemaType,
    profile: ReadProfileSchemaType
  ) => Promise<void>;
};

export const isDirty = (
  data: ReadProfileSchemaType,
  profileState: ReadProfileSchemaType
) => {
  return (
    data.bio !== profileState.bio ||
    data.activity !== profileState.activity ||
    data.children !== profileState.children ||
    data.consumables !== profileState.consumables ||
    data.drinking !== profileState.drinking ||
    data.ethnicity !== profileState.ethnicity ||
    data.height !== profileState.height ||
    data.income !== profileState.income ||
    data.levelOfEducation !== profileState.levelOfEducation ||
    data.location !== profileState.location ||
    data.maritalStatus !== profileState.maritalStatus ||
    data.purity !== profileState.purity ||
    data.religion !== profileState.religion ||
    data.weight !== profileState.weight ||
    data.willingToRelocate !== profileState.willingToRelocate ||
    data.politicalBeliefs !== profileState.politicalBeliefs ||
    data.links !== profileState.links
  );
};

export function Profile({ profile, canEdit, interact }: ProfileProps) {
  const router = useRouter();
  const [profileState, setProfileState] = useState(profile);
  const update = api.profiles.update.useMutation();
  const updateImage = api.profiles.updateImage.useMutation();
  const handleUpdateImage = useCallback(
    (imageURL: string) => {
      updateImage
        .mutateAsync({ userId: profileState.userId, image: imageURL })
        .then(() => {
          setProfileState({ ...profileState, image: imageURL });
        })
        .catch(handleError);
    },
    [updateImage, profileState, setProfileState]
  );

  const form = useForm<ReadProfileSchemaType>({
    resolver: zodResolver(ReadProfileSchema),
    defaultValues: {
      ...profileState,
    },
  });
  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: ReadProfileSchemaType) => {
      setEditMode(false);

      if (isDirty(profileState, data)) {
        update.mutateAsync(data as MutateProfileSchemaType).catch(handleError);
        setProfileState(data);
      }
    },
    [setProfileState, update, profileState]
  );

  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);

      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );
  const [editMode, setEditMode] = useState(false);
  return (
    <Form
      onSubmit={form.handleSubmit(onValidData, onInvalidData)}
      form={form}
      className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-6"
    >
      <ProfileHeader
        canEdit={canEdit}
        handleUpdateImage={handleUpdateImage}
        image={profileState?.image ?? ""}
        header={`${profile.username} (${profile.age})`}
      />
      <ProfileLocation
        location={profile.location}
        willingToRelocate={profile.willingToRelocate === "YES"}
        isEditMode={editMode}
        editor={
          <ComboBoxFormField<ReadProfileSchemaType, LocationSchemaType>
            options={LocationSelectionValues()}
            name="location"
            control={form.control}
            className="flex w-full self-center sm:w-72"
          />
        }
      />
      <ProfileAttributeList>
        <ProfileLinks
          links={profileState.links ?? []}
          isEditMode={editMode}
          editor={
            <LinksEditorFormField
              name="links"
              control={form.control}
              list={profileState.links ?? []}
            />
          }
        />
      </ProfileAttributeList>
      <ProfileSection
        heading="About"
        canEdit={true}
        editMode={editMode}
        setEditMode={setEditMode}
      >
        <ProfileDescription
          description={profileState.bio}
          isEditMode={editMode}
          editor={<TextAreaFormField name="bio" control={form.control} />}
        />
      </ProfileSection>
      <ProfileSection
        heading="Attributes"
        canEdit={true}
        editMode={editMode}
        setEditMode={setEditMode}
      >
        <div className="grid h-full w-full items-center justify-around md:grid-cols-2 lg:grid-cols-3">
          <ProfileCardSubheading title="General" />
          <ProfileAttribute
            option={ProfileAttributeOptions.religion}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.religion}`}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="religion"
                control={form.control}
                options={ReligionSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.maritalStatus}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.maritalStatus}`}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="maritalStatus"
                control={form.control}
                options={MaritalStatusesSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.politicalBeliefs}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.politicalBeliefs}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="politicalBeliefs"
                control={form.control}
                options={PoliticalBeliefsSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.education}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.levelOfEducation}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="levelOfEducation"
                control={form.control}
                options={LevelOfEducationSelectionValues}
              />
            }
          />
          <ProfileCardSubheading title={"Lifestyle"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.height}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.height}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="height"
                control={form.control}
                options={HeightStringSelectOptions}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.weight}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.weight}
            weightUnit={profile.weightUnit}
            isEditMode={editMode}
            editor={
              <InputFormField
                control={form.control}
                name="weight"
                type="number"
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.drinking}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.drinking}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="drinking"
                control={form.control}
                options={DrinkingSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.consumables}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.consumables}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="consumables"
                control={form.control}
                options={ConsumablesSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.activityLevel}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={`${profile.activity}`}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="activity"
                control={form.control}
                options={ActivitySelectionValues}
              />
            }
          />
          <ProfileCardSubheading title={"Family"} />
          <ProfileAttribute
            option={ProfileAttributeOptions.purity}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.purity}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="purity"
                control={form.control}
                options={PuritySelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.children}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.children}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="children"
                control={form.control}
                options={ChildrenSelectionValues}
              />
            }
          />
          <ProfileAttribute
            option={ProfileAttributeOptions.income}
            variant={ProfileAttributeVariant.PROFILE}
            attribute={profile.income}
            isEditMode={editMode}
            editor={
              <DropdownFormField<ReadProfileSchemaType>
                name="income"
                control={form.control}
                options={IncomeSelectionValues}
              />
            }
          />
        </div>
      </ProfileSection>
      {!!profile.circles?.length && (
        <ProfileSection heading="Circles">
          <div className="grid w-full sm:grid-cols-2">
            <ItemList
              items={profile.circles.map(ParseItem)}
              clickAction={handleRoute}
            />
          </div>
        </ProfileSection>
      )}
      {interact && (
        <ProfileSection>
          <ProfileActions profile={profile} interact={interact} />
        </ProfileSection>
      )}
    </Form>
  );
}
