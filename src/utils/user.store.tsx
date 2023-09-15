"use client";

import { CirclesList, Users, UsersPreferences } from "prisma/seeds/data";
import { ProfileSchemaType } from "@/schemas/Profile";

const state = {
  // TODO: Read user frm cache
  currentUser: Users[0] as ProfileSchemaType,
  currentUserPreferences: UsersPreferences[0],
  currentCircles: [...CirclesList],
};

export default state;
