import { User, UserCircle, UserProfile } from "@prisma/client";
import { Users } from "./data";
import { handleDisconnect, handleError } from "./util";
import { prisma } from "../../src/server/db";

export function seedUsers() {
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

  const userProfiles: UserProfile[] = Users.map((userProfile) => ({
    username: userProfile.username,
    sex: userProfile.sex,
    birthDate: userProfile.birthDate,
    weight: userProfile.weight,
    height: userProfile.height,
    continent: userProfile.continent,
    locationId: userProfile.locationId ?? "",
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

  prisma.userProfile
    .createMany({
      data: userProfiles,
    })
    .then(handleDisconnect)
    .catch(handleError);

  const userCircles: UserCircle[] = [];
  Users.forEach(({ username, circles }) =>
    circles.forEach(({ name }) => {
      userCircles.push({ circleName: name, username: username });
    })
  );

  prisma.userCircle
    .createMany({
      data: userCircles,
    })
    .then(handleDisconnect)
    .catch(handleError);
}
