import { ProfileList } from "../ProfilesList/ProfilesList";
import { TEST_DATA } from "@/schemas/Profile";
import { memo } from "react";
import React from "react";

export type ProfilesViewProps = Record<never, never>;

export const ProfilesView: React.FC<ProfileViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* TODO: Replace with actual profiles */}
      <ProfileList profiles={[TEST_DATA[1], TEST_DATA[2]]} />
    </main>
  );
});
