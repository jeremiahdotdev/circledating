"use client";

import { CirclesList, Users, UsersPreferences } from "prisma/seeds/data";

const state = {
  // TODO: Read user frm cache
  currentUser: Users[0],
  currentUserPreferences: UsersPreferences[0],
  currentCircles: [...CirclesList],
};

export default state;
