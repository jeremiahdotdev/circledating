import { ProfileList } from "../ProfilesList/ProfilesList";
import { TEST_DATA } from "@/schemas/Profile";
import { memo } from "react";
import React from "react";

export type ProfileViewProps = Record<never, never>;

export const ProfileView: React.FC<ProfileViewProps> = memo(() => {
  return (
    <main>
      <ProfileList profiles={[TEST_DATA]} />
    </main>
  );
});
