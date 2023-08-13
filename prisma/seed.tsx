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
    if (circle.continentRestriction)
      circleContinentRestriction.push({
        circleName: circle.name,
        restriction: circle.continentRestriction,
      });
    if (circle.sexRestriction)
      circleSexRestriction.push({
        circleName: circle.name,
        restriction: circle.sexRestriction,
      });
    if (circle.willingToRelocateRestriction)
      circleRelocationRestriction.push({
        circleName: circle.name,
        restriction: circle.willingToRelocateRestriction,
      });
    if (circle.childrenRestriction)
      circleChildrenRestriction.push({
        circleName: circle.name,
        restriction: circle.childrenRestriction,
      });
    if (circle.ethnicityRestriction)
      circleEthnicityRestriction.push({
        circleName: circle.name,
        restriction: circle.ethnicityRestriction,
      });
    if (circle.drinkingRestriction)
      circleDrinkingRestriction.push({
        circleName: circle.name,
        restriction: circle.drinkingRestriction,
      });
    if (circle.consumablesRestriction)
      circleConsumablesRestriction.push({
        circleName: circle.name,
        restriction: circle.consumablesRestriction,
      });
    if (circle.politicalBeliefsRestriction)
      circlePoliticalBeliefsRestriction.push({
        circleName: circle.name,
        restriction: circle.politicalBeliefsRestriction,
      });
    if (circle.levelOfEducationRestriction)
      circleLevelOfEducationRestriction.push({
        circleName: circle.name,
        restriction: circle.levelOfEducationRestriction,
      });
    if (circle.purityRestriction)
      circlePurityRestriction.push({
        circleName: circle.name,
        restriction: circle.purityRestriction,
      });
    if (circle.onlyLookingForTraditionalHouseholdRestriction)
      circleTraditionalRestriction.push({
        circleName: circle.name,
        restriction: circle.onlyLookingForTraditionalHouseholdRestriction,
      });
    if (circle.incomeRestriction)
      circleIncomeRestriction.push({
        circleName: circle.name,
        restriction: circle.incomeRestriction,
      });
    if (circle.maritalStatusRestriction)
      circleMaritalStatusRestriction.push({
        circleName: circle.name,
        restriction: circle.maritalStatusRestriction,
      });
    if (circle.activityRestriction)
      circleActivityRestriction.push({
        circleName: circle.name,
        restriction: circle.activityRestriction,
      });
    if (circle.religionRestriction)
      circleReligionRestriction.push({
        circleName: circle.name,
        restriction: circle.religionRestriction,
      });

    circles.push({
      name: circle.name,
      label: circle.label,
      ageMinRestriction: circle.ageMinRestriction ?? null,
      ageMaxRestriction: circle.ageMaxRestriction ?? null,
      maxWeightRestriction: circle.maxWeightRestriction ?? null,
      sexRestriction: {
        connect: {
          circleName: circle.name,
        },
      },
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
