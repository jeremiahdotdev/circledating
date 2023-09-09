import { Loading } from "@/components/Shared/Loading";
import { ProfileList } from "../../components/Profile/ProfilesList";
import { ProfileSchemaType, ReadProfilesSchemaType } from "@/schemas/Profile";
import { UserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";
import state from "@/utils/user.store";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfilesViewProps> = memo(() => {
  // TODO: Switch to using getServerSideProps once we integrate a real state.
  const currentUserProfile: ProfileSchemaType = state.currentUser;
  const currentUserPreferences: UserPreferencesSchemaType =
    state.currentUserPreferences;

  const options: ReadProfilesSchemaType = {
    currentUserProfile: currentUserProfile,
    currentUserPreferences: currentUserPreferences,
  };

  const request = api.profiles.readMany.useQuery(options);

  if (!request.data) return <Loading />;

  return (
    <main className="flex min-h-navless flex-col items-center justify-between md:pt-6">
      <ProfileList profiles={request.data} />
    </main>
  );
});
