/* eslint-disable max-lines-per-function */
import { Circle, Prisma } from "@prisma/client";
import { CircleSchemaType } from "../../src/schemas/Circle";
import { CirclesList } from "./data";
import { handlePrismaError } from "./util";
import { prisma } from "../../src/server/db";

export async function seedCircles() {
  const circles: Circle[] = [];
  CirclesList.forEach((circle: CircleSchemaType) => {
    const circleClean: Circle = {
      id: `${circle.id}`,
      name: circle.name,
      label: circle.label,
      code: `${circle.id}`,
      description: circle.description ?? null,
      ageMinRestriction: circle.ageMinRestriction ?? null,
      ageMaxRestriction: circle.ageMaxRestriction ?? null,
      maxWeightRestriction: circle.maxWeightRestriction ?? null,
      sexRestriction: circle.sexRestriction as Prisma.JsonArray,
      continentRestriction: circle.continentRestriction as Prisma.JsonArray,
      childrenRestriction: circle.childrenRestriction as Prisma.JsonArray,
      ethnicityRestriction: circle.ethnicityRestriction as Prisma.JsonArray,
      drinkingRestriction: circle.drinkingRestriction as Prisma.JsonArray,
      consumablesRestriction: circle.consumablesRestriction as Prisma.JsonArray,
      politicalBeliefsRestriction:
        circle.politicalBeliefsRestriction as Prisma.JsonArray,
      levelOfEducationRestriction:
        circle.levelOfEducationRestriction as Prisma.JsonArray,
      purityRestriction: circle.purityRestriction as Prisma.JsonArray,
      incomeRestriction: circle.incomeRestriction as Prisma.JsonArray,
      maritalStatusRestriction:
        circle.maritalStatusRestriction as Prisma.JsonArray,
      activityRestriction: circle.activityRestriction as Prisma.JsonArray,
      religionRestriction: circle.religionRestriction as Prisma.JsonArray,
      isFeatured: true,
      isPrivate: false,
      updatedAt: null,
      createdAt: new Date(),
    };
    circles.push(circleClean);
  });

  try {
    await prisma.circle.createMany({
      data: [
        ...circles.map((c) => ({
          ...c,
          sexRestriction:
            c.sexRestriction !== null ? c.sexRestriction : Prisma.JsonNull,
          continentRestriction:
            c.continentRestriction !== null
              ? c.continentRestriction
              : Prisma.JsonNull,
          childrenRestriction:
            c.childrenRestriction !== null
              ? c.childrenRestriction
              : Prisma.JsonNull,
          ethnicityRestriction:
            c.ethnicityRestriction !== null
              ? c.ethnicityRestriction
              : Prisma.JsonNull,
          drinkingRestriction:
            c.drinkingRestriction !== null
              ? c.drinkingRestriction
              : Prisma.JsonNull,
          consumablesRestriction:
            c.consumablesRestriction !== null
              ? c.consumablesRestriction
              : Prisma.JsonNull,
          politicalBeliefsRestriction:
            c.politicalBeliefsRestriction !== null
              ? c.politicalBeliefsRestriction
              : Prisma.JsonNull,
          levelOfEducationRestriction:
            c.levelOfEducationRestriction !== null
              ? c.levelOfEducationRestriction
              : Prisma.JsonNull,
          purityRestriction:
            c.purityRestriction !== null
              ? c.purityRestriction
              : Prisma.JsonNull,
          incomeRestriction:
            c.incomeRestriction !== null
              ? c.incomeRestriction
              : Prisma.JsonNull,
          maritalStatusRestriction:
            c.maritalStatusRestriction !== null
              ? c.maritalStatusRestriction
              : Prisma.JsonNull,
          activityRestriction:
            c.activityRestriction !== null
              ? c.activityRestriction
              : Prisma.JsonNull,
          religionRestriction:
            c.religionRestriction !== null
              ? c.religionRestriction
              : Prisma.JsonNull,
        })),
      ],
    });
  } catch (error: unknown) {
    await handlePrismaError(error);
  }
}
