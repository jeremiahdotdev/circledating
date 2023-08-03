import { ProfileList } from "@/views/ProfilesList/ProfilesList";
import { TEST_DATA } from "@/schemas/Profile";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ProfileList profiles={[TEST_DATA, TEST_DATA, TEST_DATA, TEST_DATA]} />
    </main>
  );
}
