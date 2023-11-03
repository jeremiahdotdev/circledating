import { CircleProfile } from "@/components/Circle/CircleProfile";
import { memo } from "react";

import { Loading } from "@/components/Shared/Loading";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import React from "react";

export type CircleViewProps = {
  circle: ReadCircleSchemaType;
  isAdmin: boolean;
};

export const CircleView = memo(function CircleView({
  circle,
  isAdmin,
}: CircleViewProps) {
  return (
    <main className="min-h-window p-2">
      {circle ? (
        <CircleProfile circle={circle} canEdit={isAdmin} />
      ) : (
        <Loading />
      )}
    </main>
  );
});
