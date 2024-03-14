"use client";
import { NewProfile } from "@/components/NewProfile/NewProfile";
import { memo, useCallback, useState } from "react";
import Animation from "public/animation";
import React from "react";

export type NewProfileViewProps = Record<never, never>;

export const NewProfileView: React.FC<NewProfileViewProps> = memo(() => {
  const [showNewProfileState, setShowNewProfileState] = useState(false);
  const toggleNewProfileState = useCallback(
    () => setShowNewProfileState(true),
    []
  );

  setTimeout(toggleNewProfileState, 5000);
  if (!showNewProfileState) return <Animation />;

  return <NewProfile />;
});
