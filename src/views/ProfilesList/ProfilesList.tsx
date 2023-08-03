import { ProfileCard } from "./ProfileCard";
import { ProfileSchemaType } from "@/schemas/Profile";
import React, { memo } from "react";

export type ProfileListProps = {
  profiles: ProfileSchemaType[];
};

export const ProfileList = memo(function ProfileList({
  profiles,
}: ProfileListProps) {
  if (profiles.length === 0) return <div>No profiles found</div>;

  return (
    <div className="flex w-full max-w-full flex-row flex-wrap items-center justify-center gap-12">
      {profiles.map((profile: ProfileSchemaType) => (
        // TODO: Replace username with id
        <ProfileCard key={profile.username} profile={profile} />
      ))}
    </div>
  );
});
