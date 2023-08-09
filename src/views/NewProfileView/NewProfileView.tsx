import { NewProfile } from "../NewProfile/NewProfile";
import { memo } from "react";
import React from "react";

export type NewProfileViewProps = Record<never, never>;

export const NewProfileView: React.FC<NewProfileViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NewProfile circle={{ name: "r/ChristianDating" }} />
    </main>
  );
});
