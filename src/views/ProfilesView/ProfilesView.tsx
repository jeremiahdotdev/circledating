import { Loading } from "@/components/Shared/Loading";
import { ProfileList } from "../../components/Profile/ProfilesList";
import { ReadProfilesSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";
import state from "@/utils/user.store";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfilesViewProps> = memo(() => {
  // TODO: Switch to using getServerSideProps once we integrate a real state.
  const options: ReadProfilesSchemaType = {
    currentUserProfile: state.currentUser,
    currentUserPreferences: state.currentUserPreferences,
  };
  const request = api.profiles.readMany.useQuery(options);

  if (!request.data) return <Loading />;

  const profiles = request.data.map((userProfile) => ({
    ...userProfile,
    bio: userProfile.bio ?? "",
    circles: null,
    interactions: null,
    links: null,
  }));

  return (
    <main className="flex min-h-navless flex-col items-center justify-between md:pt-6">
      <ProfileList profiles={profiles} />
    </main>
  );
});
