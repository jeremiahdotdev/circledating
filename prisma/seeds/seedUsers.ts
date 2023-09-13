import { User, UserCircle, UserProfile } from "@prisma/client";
import { Users } from "./data";
import { handleDisconnect, handleError } from "./util";
import { prisma } from "../../src/server/db";

export async function seedUsers() {
  const users: User[] = Users.map((user, index) => ({
    id: index.toString(),
    username: user.username,
    password: user.password,
    email: user.email,
    createdAt: new Date(),
    updatedAt: null,
  }));

  prisma.user
    .createMany({
      data: users,
    })
    .then(handleDisconnect)
    .catch(handleError);

  let userId = 0;
  const userProfiles: UserProfile[] = Users.map((userProfile) => ({
    userId: `${userId++}`,
    username: userProfile.username,
    sex: userProfile.sex,
    birthDate: userProfile.birthDate,
    weight: userProfile.weight,
    height: userProfile.height,
    locationId: userProfile.location.id,
    willingToRelocate: userProfile.willingToRelocate,
    children: userProfile.children,
    ethnicity: userProfile.ethnicity,
    drinking: userProfile.drinking,
    consumables: userProfile.consumables,
    politicalBeliefs: userProfile.politicalBeliefs,
    levelOfEducation: userProfile.levelOfEducation,
    purity: userProfile.purity,
    onlyLookingForTraditionalHousehold:
      userProfile.onlyLookingForTraditionalHousehold,
    income: userProfile.income,
    maritalStatus: userProfile.maritalStatus,
    activity: userProfile.activity,
    religion: userProfile.religion,
    bio: userProfile.bio,
    weightUnit: userProfile.weightUnit,
  }));

  const userCircles: UserCircle[] = [];
  let circleId = 0;
  Users.forEach(({ userId, circles }) =>
    circles.forEach(({ id }) => {
      circleId++;
      userCircles.push({
        id: `${circleId}`,
        circleId: id ?? "",
        userId: userId,
        createdAt: new Date(),
        updatedAt: null,
      });
    })
  );

  try {
    await prisma.userCircle.createMany({
      data: userCircles,
    });
    await prisma.userProfile.createMany({
      data: userProfiles,
    });
  } catch (error: unknown) {
    await handleError(error);
  }
}
