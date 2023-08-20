"use client";

import { CheckboxList } from "@/components/ui/CheckboxList";
import React from "react";
import state from "@/utils/user.store";

export function CurrentUserCircles() {
  return <CheckboxList options={state.currentUser.circles} />;
}
