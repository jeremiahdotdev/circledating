import { Loading } from "@/components/nav/loading";
import { ProfileList } from "../ProfilesList/ProfilesList";
import { ReadProfileSchemaSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";
import state from "@/utils/user.store";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfilesViewProps> = memo(() => {
  // TODO: Switch to using getServerSideProps once we integrate a real state.
  const options: ReadProfileSchemaSchemaType = {
    currentUserProfile: state.currentUser,
    currentUserPreferences: state.currentUserPreferences,
  };
  const request = api.profiles.read.useQuery(options);

  if (!request.data) return <Loading />;

  const profiles = request.data.map((userProfile) => ({
    userId: userProfile.userId,
    username: userProfile.username,
    sex: userProfile.sex,
    birthDate: userProfile.birthDate,
    weight: userProfile.weight,
    height: userProfile.height,
    location: userProfile.location,
    willingToRelocate: userProfile.willingToRelocate,
    children: userProfile.children,
    ethnicity: userProfile.ethnicity,
    drinking: userProfile.drinking,
    consumables: userProfile.consumables,
    politicalBeliefs: userProfile.politicalBeliefs,
    levelOfEducation: userProfile.levelOfEducation,
    purity: userProfile.purity,
    onlyLookingForTraditionalHousehold:
      userProfile.onlyLookingForTraditionalHousehold,
    income: userProfile.income,
    maritalStatus: userProfile.maritalStatus,
    activity: userProfile.activity,
    religion: userProfile.religion,
    bio: userProfile.bio ?? "",
    weightUnit: userProfile.weightUnit,
    circles: null,
    interaction: null,
  }));
  return (
    <main className="flex min-h-navless flex-col items-center justify-between">
      <ProfileList profiles={profiles} />
    </main>
  );
});
