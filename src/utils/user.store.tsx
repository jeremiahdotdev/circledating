"use client";

import { CirclesList, Users } from "prisma/seeds/data";

const state = {
  // TODO: Read user frm cache
  currentUser: Users[0],
  currentCircles: [...CirclesList],
};

export default state;
