/* eslint-disable max-lines-per-function */
import {
  Circle,
  CircleActivityRestriction,
  CircleChildrenRestriction,
  CircleConsumablesRestriction,
  CircleContinentRestriction,
  CircleDrinkingRestriction,
  CircleEthnicityRestriction,
  CircleIncomeRestriction,
  CircleLevelOfEducationRestriction,
  CircleMaritalStatusRestriction,
  CirclePoliticalBeliefsRestriction,
  CirclePurityRestriction,
  CircleReligionRestriction,
  CircleRelocationRestriction,
  CircleSexRestriction,
  CircleTraditionalRestriction,
} from "@prisma/client";
import { CircleSchemaType } from "../../src/schemas/Circle";
import { CirclesList } from "./data";
import { handleError } from "./util";
import { prisma } from "../../src/server/db";

export async function seedCircles() {
  const circleContinentRestriction: CircleContinentRestriction[] = [];
  const circleSexRestriction: CircleSexRestriction[] = [];
  const circleRelocationRestriction: CircleRelocationRestriction[] = [];
  const circleChildrenRestriction: CircleChildrenRestriction[] = [];
  const circleEthnicityRestriction: CircleEthnicityRestriction[] = [];
  const circleDrinkingRestriction: CircleDrinkingRestriction[] = [];
  const circleConsumablesRestriction: CircleConsumablesRestriction[] = [];
  const circlePoliticalBeliefsRestriction: CirclePoliticalBeliefsRestriction[] =
    [];
  const circleLevelOfEducationRestriction: CircleLevelOfEducationRestriction[] =
    [];
  const circlePurityRestriction: CirclePurityRestriction[] = [];
  const circleTraditionalRestriction: CircleTraditionalRestriction[] = [];
  const circleIncomeRestriction: CircleIncomeRestriction[] = [];
  const circleMaritalStatusRestriction: CircleMaritalStatusRestriction[] = [];
  const circleActivityRestriction: CircleActivityRestriction[] = [];
  const circleReligionRestriction: CircleReligionRestriction[] = [];
  const circles: Circle[] = [];

  CirclesList.forEach((circle: CircleSchemaType) => {
    circle.continentRestriction?.forEach((restriction) => {
      circleContinentRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.sexRestriction?.forEach((restriction) => {
      circleSexRestriction.push({
        id: circleSexRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.willingToRelocateRestriction?.forEach((restriction) => {
      circleRelocationRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.childrenRestriction?.forEach((restriction) => {
      circleChildrenRestriction.push({
        id: circleChildrenRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.ethnicityRestriction?.forEach((restriction) => {
      circleEthnicityRestriction.push({
        id: circleEthnicityRestriction.length.toString(),
        circleId: circle.name,
        restriction: restriction,
      });
    });
    circle.drinkingRestriction?.forEach((restriction) => {
      circleDrinkingRestriction.push({
        id: circleDrinkingRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.consumablesRestriction?.forEach((restriction) => {
      circleConsumablesRestriction.push({
        id: circleConsumablesRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.politicalBeliefsRestriction?.forEach((restriction) => {
      circlePoliticalBeliefsRestriction.push({
        id: circlePoliticalBeliefsRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.levelOfEducationRestriction?.forEach((restriction) => {
      circleLevelOfEducationRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.purityRestriction?.forEach((restriction) => {
      circlePurityRestriction.push({
        id: circlePurityRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.onlyLookingForTraditionalHouseholdRestriction?.forEach(
      (restriction) => {
        circleTraditionalRestriction.push({
          id: circleTraditionalRestriction.length.toString(),
          circleId: circle.id ?? "",
          restriction: restriction,
        });
      }
    );
    circle.incomeRestriction?.forEach((restriction) => {
      circleIncomeRestriction.push({
        id: circleIncomeRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.maritalStatusRestriction?.forEach((restriction) => {
      circleMaritalStatusRestriction.push({
        id: circleMaritalStatusRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.activityRestriction?.forEach((restriction) => {
      circleActivityRestriction.push({
        id: circleActivityRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circle.religionRestriction?.forEach((restriction) => {
      circleReligionRestriction.push({
        id: circleReligionRestriction.length.toString(),
        circleId: circle.id ?? "",
        restriction: restriction,
      });
    });
    circles.push({
      id: `${circle.id}`,
      name: circle.name,
      label: circle.label,
      description: circle.description ?? null,
      ageMinRestriction: circle.ageMinRestriction ?? null,
      ageMaxRestriction: circle.ageMaxRestriction ?? null,
      maxWeightRestriction: circle.maxWeightRestriction ?? null,
      isFeatured: true,
      isPrivate: false,
      updatedAt: null,
      createdAt: new Date(),
    });
  });

  try {
    await prisma.circleContinentRestriction.createMany({
      data: circleContinentRestriction,
    });
    await prisma.circleSexRestriction.createMany({
      data: circleSexRestriction,
    });
    await prisma.circleRelocationRestriction.createMany({
      data: circleRelocationRestriction,
    });
    await prisma.circleChildrenRestriction.createMany({
      data: circleChildrenRestriction,
    });
    await prisma.circleEthnicityRestriction.createMany({
      data: circleEthnicityRestriction,
    });
    await prisma.circleDrinkingRestriction.createMany({
      data: circleDrinkingRestriction,
    });
    await prisma.circleConsumablesRestriction.createMany({
      data: circleConsumablesRestriction,
    });
    await prisma.circlePoliticalBeliefsRestriction.createMany({
      data: circlePoliticalBeliefsRestriction,
    });
    await prisma.circleLevelOfEducationRestriction.createMany({
      data: circleLevelOfEducationRestriction,
    });
    await prisma.circlePurityRestriction.createMany({
      data: circlePurityRestriction,
    });
    await prisma.circleTraditionalRestriction.createMany({
      data: circleTraditionalRestriction,
    });
    await prisma.circleIncomeRestriction.createMany({
      data: circleIncomeRestriction,
    });
    await prisma.circleMaritalStatusRestriction.createMany({
      data: circleMaritalStatusRestriction,
    });
    await prisma.circleActivityRestriction.createMany({
      data: circleActivityRestriction,
    });
    await prisma.circleReligionRestriction.createMany({
      data: circleReligionRestriction,
    });
  } catch (error: unknown) {
    await handleError(error);
  }

  try {
    await prisma.circle.createMany({
      data: circles,
    });
  } catch (error: unknown) {
    await handleError(error);
  }
}
