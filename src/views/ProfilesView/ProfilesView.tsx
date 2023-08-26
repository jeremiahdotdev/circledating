import { Loading } from "@/components/nav/loading";
import { ProfileList } from "../ProfilesList/ProfilesList";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";
import state from "@/utils/user.store";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfilesViewProps> = memo(() => {
  const request = api.profiles.read.useQuery({
    currentUserProfile: state.currentUser,
    circles: state.currentCircles,
  });

  if (!request.data) return <Loading />;

  const profiles = request.data.map((userProfile) => ({
    username: userProfile.username,
    sex: userProfile.sex,
    birthDate: userProfile.birthDate,
    weight: userProfile.weight,
    height: userProfile.height,
    continent: userProfile.continent,
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
    circles: userProfile.circles.map(({ Circle }) => ({
      label: Circle.label,
      name: Circle.name,
      sexRestriction: Circle.sexRestriction.map(
        ({ restriction }) => restriction
      ),
      incomeRestriction: Circle.incomeRestriction.map(
        ({ restriction }) => restriction
      ),
      purityRestriction: Circle.purityRestriction.map(
        ({ restriction }) => restriction
      ),
      activityRestriction: Circle.activityRestriction.map(
        ({ restriction }) => restriction
      ),
      childrenRestriction: Circle.childrenRestriction.map(
        ({ restriction }) => restriction
      ),
      drinkingRestriction: Circle.drinkingRestriction.map(
        ({ restriction }) => restriction
      ),
      continentRestriction: Circle.continentRestriction.map(
        ({ restriction }) => restriction
      ),
      ethnicityRestriction: Circle.ethnicityRestriction.map(
        ({ restriction }) => restriction
      ),
      consumablesRestriction: Circle.consumablesRestriction.map(
        ({ restriction }) => restriction
      ),
      maritalStatusRestriction: Circle.maritalStatusRestriction.map(
        ({ restriction }) => restriction
      ),
      levelOfEducationRestriction: Circle.levelOfEducationRestriction.map(
        ({ restriction }) => restriction
      ),
      politicalBeliefsRestriction: Circle.politicalBeliefsRestriction.map(
        ({ restriction }) => restriction
      ),
      willingToRelocateRestriction: Circle.willingToRelocateRestriction.map(
        ({ restriction }) => restriction
      ),
      onlyLookingForTraditionalHouseholdRestriction:
        Circle.onlyLookingForTraditionalHouseholdRestriction.map(
          ({ restriction }) => restriction
        ),
    })),
  }));
  return (
    <main className="flex min-h-navless flex-col items-center justify-between">
      <ProfileList profiles={profiles} />
    </main>
  );
});
