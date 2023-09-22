import { CircleSchemaType } from "@/schemas/Circle";
import { NewProfile } from "./NewProfile";
import { api } from "@/utils/api";
import Animation from "public/animation";
import React, { useCallback, useState } from "react";

export type NewProfileWithCircleProps = {
  circleCode: string;
};

export function NewProfileWithCircle({
  circleCode,
}: NewProfileWithCircleProps) {
  const [showNewProfileState, setShowNewProfileState] = useState(false);
  const toggleNewProfileState = useCallback(
    () => setShowNewProfileState(true),
    []
  );
  const requestCircle = api.circles.readByCode.useQuery({
    code: circleCode,
  });

  const circle = requestCircle.data as CircleSchemaType;

  setTimeout(toggleNewProfileState, 5000);
  if (!circle || !showNewProfileState) return <Animation />;

  return <NewProfile circle={circle} />;
}
