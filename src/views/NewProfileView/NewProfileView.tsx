import { Circles } from "prisma/seeds/data";
import { NewProfile } from "../../components/NewProfile/NewProfile";
import { memo } from "react";
import React from "react";

export type NewProfileViewProps = Record<never, never>;

export const NewProfileView: React.FC<NewProfileViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NewProfile circle={Circles.Religion.Christianity} />
    </main>
  );
});
