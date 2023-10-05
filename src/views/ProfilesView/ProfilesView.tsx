import { Loading } from "@/components/Shared/Loading";
import { ProfileList } from "../../components/Profile/ProfilesList";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { api } from "@/utils/api";
import { memo } from "react";
import React from "react";

export type ProfilesViewProps = {
  profiles: ReadProfileSchemaType[];
};

export const ProfilesView = memo(function ProfilesView() {
  const request = api.profiles.readProfiles.useQuery();

  if (!request.data) return <Loading />;

  return <ProfileList profiles={request.data as ReadProfileSchemaType[]} />;
});
