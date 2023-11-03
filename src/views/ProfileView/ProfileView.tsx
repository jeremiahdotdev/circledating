import { Loading } from "@/components/Shared/Loading";
import { Profile } from "@/components/Profile/Profile";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { memo } from "react";
import React from "react";

export type ProfileViewProps = {
  profile: ReadProfileSchemaType;
};

export const ProfileView = memo(function ProfilesView({
  profile,
}: ProfileViewProps) {
  if (!profile) return <Loading />;
  return <Profile profile={profile} canEdit={true} />;
});
