import {
  $Enums,
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
  Continent,
} from "@prisma/client";
import { CircleSchemaType, DefaultCirclesList } from "@/schemas/Circle";
import { prisma } from "@/server/db";

function createMany() {
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
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.sexRestriction?.forEach((restriction) => {
      circleSexRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.willingToRelocateRestriction?.forEach((restriction) => {
      circleRelocationRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.childrenRestriction?.forEach((restriction) => {
      circleChildrenRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.ethnicityRestriction?.forEach((restriction) => {
      circleEthnicityRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.drinkingRestriction?.forEach((restriction) => {
      circleDrinkingRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.consumablesRestriction?.forEach((restriction) => {
      circleConsumablesRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.politicalBeliefsRestriction?.forEach((restriction) => {
      circlePoliticalBeliefsRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.levelOfEducationRestriction?.forEach((restriction) => {
      circleLevelOfEducationRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.purityRestriction?.forEach((restriction) => {
      circlePurityRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.onlyLookingForTraditionalHouseholdRestriction?.forEach(
      (restriction) => {
        circleTraditionalRestriction.push({
          id: "",
          circleName: circle.name,
          restriction: restriction,
        });
      }
    );
    circle.incomeRestriction?.forEach((restriction) => {
      circleIncomeRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.maritalStatusRestriction?.forEach((restriction) => {
      circleMaritalStatusRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.activityRestriction?.forEach((restriction) => {
      circleActivityRestriction.push({
        id: "",
        circleName: circle.name,
        restriction: restriction,
      });
    });
    circle.religionRestriction?.forEach((restriction) => {
      circleReligionRestriction.push({
        id: "",
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

  void prisma.circleContinentRestriction.createMany({
    data: circleContinentRestriction,
  });
  void prisma.circleSexRestriction.createMany({ data: circleSexRestriction });
  void prisma.circleRelocationRestriction.createMany({
    data: circleRelocationRestriction,
  });
  void prisma.circleChildrenRestriction.createMany({
    data: circleChildrenRestriction,
  });
  void prisma.circleEthnicityRestriction.createMany({
    data: circleEthnicityRestriction,
  });
  void prisma.circleDrinkingRestriction.createMany({
    data: circleDrinkingRestriction,
  });
  void prisma.circleConsumablesRestriction.createMany({
    data: circleConsumablesRestriction,
  });
  void prisma.circlePoliticalBeliefsRestriction.createMany({
    data: circlePoliticalBeliefsRestriction,
  });
  void prisma.circleLevelOfEducationRestriction.createMany({
    data: circleLevelOfEducationRestriction,
  });
  void prisma.circlePurityRestriction.createMany({
    data: circlePurityRestriction,
  });
  void prisma.circleTraditionalRestriction.createMany({
    data: circleTraditionalRestriction,
  });
  void prisma.circleIncomeRestriction.createMany({
    data: circleIncomeRestriction,
  });
  void prisma.circleMaritalStatusRestriction.createMany({
    data: circleMaritalStatusRestriction,
  });
  void prisma.circleActivityRestriction.createMany({
    data: circleActivityRestriction,
  });
  void prisma.circleReligionRestriction.createMany({
    data: circleReligionRestriction,
  });

  void prisma.circle.createMany({
    data: circles,
  });
}

createMany();
