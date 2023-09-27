import { CircleProfile } from "@/components/Circle/CircleProfile";
import { memo } from "react";

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
  return <CircleProfile circle={circle} canEdit={isAdmin} />;
});
