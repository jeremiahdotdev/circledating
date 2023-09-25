import { Loading } from "@/components/Shared/Loading";
import { ProfileList } from "../../components/Profile/ProfilesList";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfilesViewProps> = memo(() => {
  const request = api.profiles.readProfiles.useQuery();

  if (!request.data) return <Loading />;

  return <ProfileList profiles={request.data} />;
});
