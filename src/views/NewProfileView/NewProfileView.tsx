import { DefaultCircles } from "@/schemas/Circle";
import { NewProfile } from "../NewProfile/NewProfile";
import { memo } from "react";
import React from "react";

export type NewProfileViewProps = Record<never, never>;

export const NewProfileView: React.FC<NewProfileViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NewProfile circle={DefaultCircles.Religion.Christianity} />
    </main>
  );
});
