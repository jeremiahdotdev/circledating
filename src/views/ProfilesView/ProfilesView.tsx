import { ProfileList } from "../../components/Profile/ProfilesList";
import { ReadProfileSchemaType } from "@/schemas/Profile";
import { memo } from "react";
import React from "react";

export type ProfilesViewProps = {
  profiles: ReadProfileSchemaType[];
};

export const ProfilesView = memo(function ProfilesView() {
  return <ProfileList />;
});
