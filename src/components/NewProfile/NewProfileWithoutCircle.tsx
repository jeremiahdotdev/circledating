import { NewProfile } from "./NewProfile";
import Animation from "public/animation";
import React, { useCallback, useState } from "react";

export function NewProfileWithoutCircle() {
  const [showNewProfileState, setShowNewProfileState] = useState(false);
  const toggleNewProfileState = useCallback(
    () => setShowNewProfileState(true),
    []
  );

  setTimeout(toggleNewProfileState, 5000);
  if (!showNewProfileState) return <Animation />;

  return <NewProfile />;
}
