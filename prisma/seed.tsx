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
import { CircleSchemaType, DefaultCirclesList } from "../src/schemas/Circle";
import { prisma } from "../src/server/db";

function seedAll() {
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

  DefaultCirclesList.forEach((circle: CircleSchemaType) => {
    circle.continentRestriction?.forEach((restriction) => {
      circleContinentRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.sexRestriction?.forEach((restriction) => {
      circleSexRestriction.push({
        id: circleSexRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.willingToRelocateRestriction?.forEach((restriction) => {
      circleRelocationRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.childrenRestriction?.forEach((restriction) => {
      circleChildrenRestriction.push({
        id: circleChildrenRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.ethnicityRestriction?.forEach((restriction) => {
      circleEthnicityRestriction.push({
        id: circleEthnicityRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.drinkingRestriction?.forEach((restriction) => {
      circleDrinkingRestriction.push({
        id: circleDrinkingRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.consumablesRestriction?.forEach((restriction) => {
      circleConsumablesRestriction.push({
        id: circleConsumablesRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.politicalBeliefsRestriction?.forEach((restriction) => {
      circlePoliticalBeliefsRestriction.push({
        id: circlePoliticalBeliefsRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.levelOfEducationRestriction?.forEach((restriction) => {
      circleLevelOfEducationRestriction.push({
        id: circleContinentRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.purityRestriction?.forEach((restriction) => {
      circlePurityRestriction.push({
        id: circlePurityRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.onlyLookingForTraditionalHouseholdRestriction?.forEach(
      (restriction) => {
        circleTraditionalRestriction.push({
          id: circleTraditionalRestriction.length.toString(),
          circleName: circle.name,
          restriction: restriction,
        });
      }
    );
    circle.incomeRestriction?.forEach((restriction) => {
      circleIncomeRestriction.push({
        id: circleIncomeRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.maritalStatusRestriction?.forEach((restriction) => {
      circleMaritalStatusRestriction.push({
        id: circleMaritalStatusRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.activityRestriction?.forEach((restriction) => {
      circleActivityRestriction.push({
        id: circleActivityRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.religionRestriction?.forEach((restriction) => {
      circleReligionRestriction.push({
        id: circleReligionRestriction.length.toString(),
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circles.push({
      name: circle.name,
      label: circle.label,
      ageMinRestriction: circle.ageMinRestriction ?? null,
      ageMaxRestriction: circle.ageMaxRestriction ?? null,
      maxWeightRestriction: circle.maxWeightRestriction ?? null,
    });
  });

  prisma.circleContinentRestriction
    .createMany({
      data: circleContinentRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });

  prisma.circleSexRestriction
    .createMany({ data: circleSexRestriction })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });

  prisma.circleRelocationRestriction
    .createMany({
      data: circleRelocationRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });

  prisma.circleChildrenRestriction
    .createMany({
      data: circleChildrenRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleEthnicityRestriction
    .createMany({
      data: circleEthnicityRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleDrinkingRestriction
    .createMany({
      data: circleDrinkingRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleConsumablesRestriction
    .createMany({
      data: circleConsumablesRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circlePoliticalBeliefsRestriction
    .createMany({
      data: circlePoliticalBeliefsRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleLevelOfEducationRestriction
    .createMany({
      data: circleLevelOfEducationRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circlePurityRestriction
    .createMany({
      data: circlePurityRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleTraditionalRestriction
    .createMany({
      data: circleTraditionalRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleIncomeRestriction
    .createMany({
      data: circleIncomeRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleMaritalStatusRestriction
    .createMany({
      data: circleMaritalStatusRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleActivityRestriction
    .createMany({
      data: circleActivityRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
  prisma.circleReligionRestriction
    .createMany({
      data: circleReligionRestriction,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });

  prisma.circle
    .createMany({
      data: circles,
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
    });
}

seedAll();
