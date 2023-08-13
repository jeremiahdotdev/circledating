"use client";

import { CheckboxList } from "@/components/ui/CheckboxList";
import { TEST_DATA } from "@/schemas/Profile";
import React from "react";

export function CurrentUserCircles() {
  // TODO: Replace with current user profile
  const currentUserProfile = TEST_DATA[0];
  return <CheckboxList options={currentUserProfile.circles} />;
}
