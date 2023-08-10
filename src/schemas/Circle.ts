import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { ConsumablesSchema } from "./Consumables";
import {
  Continent,
  Drinking,
  Gender,
  PoliticalBeliefs,
  Religion,
} from "@prisma/client";
import { ContinentSchema } from "./Continent";
import { CustomRestriction } from "./CustomRestriction";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";
import dayjs from "dayjs";

export const CircleSchema = z.object({
  label: z.string().min(3).max(20),
  value: z.string().min(3).max(20),
  sexRestriction: z.array(GenderSchema).optional(),
  ageMaxRestriction: z.number().optional(),
  ageMinRestriction: z.number().optional(),
  maxWeightRestriction: z.number().optional(),
  continentRestriction: z.array(ContinentSchema).optional(),
  willingToRelocateRestriction: z.array(YesAndNoSchema).optional(),
  childrenRestriction: z.array(ChildrenSchema).optional(),
  ethnicityRestriction: z.array(EthnicitySchema).optional(),
  drinkingRestriction: z.array(DrinkingSchema).optional(),
  consumablesRestriction: z.array(ConsumablesSchema).optional(),
  politicalBeliefsRestriction: z.array(PoliticalBeliefsSchema).optional(),
  levelOfEducationRestriction: z.array(LevelOfEducationSchema).optional(),
  purityRestriction: z.array(PuritySchema).optional(),
  onlyLookingForTraditionalHouseholdRestriction: z
    .array(YesAndNoSchema)
    .optional(),
  incomeRestriction: z.array(IncomeSchema).optional(),
  maritalStatusRestriction: z.array(MaritalStatusesSchema).optional(),
  activityRestriction: z.array(ActivitySchema).optional(),
  religionRestriction: z.array(ReligionSchema).optional(),
  customRestriction: z.array(CustomRestriction).optional(),
});
import { ProfileSchemaType } from "./Profile";
import { useMemo } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const DefaultCircles = {
  Religion: {
    Christianity: {
      label: "Christianity",
      value: Religion.CHRISTIANITY,
      religionRestriction: [Religion.CHRISTIANITY],
    } as CircleSchemaType,
    Athiesm: {
      label: "Athiesm",
      value: Religion.ATHEISM,
      religionRestriction: [Religion.ATHEISM],
    } as CircleSchemaType,
    Agnosticism: {
      label: "Agnosticism",
      value: Religion.AGNOSTICISM,
      religionRestriction: [Religion.AGNOSTICISM],
    } as CircleSchemaType,
    Buddhism: {
      label: "Buddhism",
      value: Religion.BUDDHISM,
      religionRestriction: [Religion.BUDDHISM],
    } as CircleSchemaType,
    Mormonism: {
      label: "Mormonism",
      value: Religion.MORMONISM,
      religionRestriction: [Religion.MORMONISM],
    } as CircleSchemaType,
    Hinduism: {
      label: "Hinduism",
      value: Religion.HINDUISM,
      religionRestriction: [Religion.HINDUISM],
    } as CircleSchemaType,
    Judaism: {
      label: "Judaism",
      value: Religion.JUDAISM,
      religionRestriction: [Religion.JUDAISM],
    } as CircleSchemaType,
    Spiritual: {
      label: "Other/Spiritual",
      value: Religion.OTHER,
      religionRestriction: [Religion.OTHER],
    } as CircleSchemaType,
  },
  Political: {
    Conservative: {
      label: "Conservative",
      value: PoliticalBeliefs.CONSERVATIVE,
      politicalBeliefsRestriction: [PoliticalBeliefs.CONSERVATIVE],
    } as CircleSchemaType,
    Moderate: {
      label: "Moderate",
      value: PoliticalBeliefs.MODERATE,
      politicalBeliefsRestriction: [PoliticalBeliefs.MODERATE],
    } as CircleSchemaType,
    Liberal: {
      label: "Liberal",
      value: PoliticalBeliefs.LIBERAL,
      politicalBeliefsRestriction: [PoliticalBeliefs.LIBERAL],
    } as CircleSchemaType,
    Independent: {
      label: "Independent",
      value: PoliticalBeliefs.INDEPENDENT,
      politicalBeliefsRestriction: [PoliticalBeliefs.INDEPENDENT],
    } as CircleSchemaType,
  },
  Gender: {
    Male: {
      label: "Male",
      value: Gender.MALE,
      sexRestriction: [Gender.MALE],
    } as CircleSchemaType,
    Female: {
      label: "Female",
      value: Gender.FEMALE,
      sexRestriction: [Gender.FEMALE],
    },
  },
  Continent: {
    NorthAmerica: {
      label: "North America",
      value: Continent.NORTH_AMERICA,
      continentRestriction: [Continent.NORTH_AMERICA],
    } as CircleSchemaType,
    SouthAmerica: {
      label: "South America",
      value: Continent.SOUTH_AMERICA,
      continentRestriction: [Continent.SOUTH_AMERICA],
    } as CircleSchemaType,
    Europe: {
      label: "Europe",
      value: Continent.EUROPE,
      continentRestriction: [Continent.EUROPE],
    } as CircleSchemaType,
    Australia: {
      label: "Australia",
      value: Continent.AUSTRALIA,
      continentRestriction: [Continent.AUSTRALIA],
    } as CircleSchemaType,
    Asia: {
      label: "Asia",
      value: Continent.ASIA,
      continentRestriction: [Continent.ASIA],
    } as CircleSchemaType,
    Antarctica: {
      label: "Antarctica",
      value: Continent.ANTARTICA,
      continentRestriction: [Continent.ANTARTICA],
    } as CircleSchemaType,
    Africa: {
      label: "Africa",
      value: Continent.AFRICA,
      continentRestriction: [Continent.AFRICA],
    } as CircleSchemaType,
  },
  Drinking: {
    Never: {
      label: "Never Drinks",
      value: Drinking.NEVER,
      drinkingRestriction: [Drinking.NEVER],
    } as CircleSchemaType,
  },
};

export const DefaultCirclesList = [
  DefaultCircles.Religion.Athiesm,
  DefaultCircles.Religion.Agnosticism,
  DefaultCircles.Religion.Buddhism,
  DefaultCircles.Religion.Christianity,
  DefaultCircles.Religion.Hinduism,
  DefaultCircles.Religion.Judaism,
  DefaultCircles.Religion.Mormonism,
  DefaultCircles.Religion.Spiritual,
  DefaultCircles.Political.Conservative,
  DefaultCircles.Political.Moderate,
  DefaultCircles.Political.Liberal,
  DefaultCircles.Political.Independent,
  DefaultCircles.Continent.NorthAmerica,
  DefaultCircles.Continent.SouthAmerica,
  DefaultCircles.Continent.Antarctica,
  DefaultCircles.Continent.Australia,
  DefaultCircles.Continent.Asia,
  DefaultCircles.Continent.Europe,
  DefaultCircles.Continent.Africa,
  DefaultCircles.Drinking.Never,
  DefaultCircles.Gender.Male,
  DefaultCircles.Gender.Female,
];

export const MatchUserWithCircles = (
  user: ProfileSchemaType,
  circle: CircleSchemaType
) => {
  const age = useMemo(() => {
    return dayjs().diff(user.birthDate, "year");
  }, [user]);

  if (circle.sexRestriction && !circle.sexRestriction?.includes(user.sex))
    return false;
  if (circle.ageMaxRestriction && circle.ageMaxRestriction <= age) return false;
  if (circle.ageMinRestriction && circle.ageMinRestriction >= age) return false;
  if (circle.maxWeightRestriction && circle.maxWeightRestriction <= user.weight)
    return false;
  if (
    circle.continentRestriction &&
    !circle.continentRestriction?.includes(user.continent)
  )
    return false;
  if (
    circle.willingToRelocateRestriction &&
    !circle.willingToRelocateRestriction?.includes(user.willingToRelocate)
  )
    return false;
  if (
    circle.childrenRestriction &&
    !circle.childrenRestriction?.includes(user.children)
  )
    return false;
  if (
    circle.ethnicityRestriction &&
    !circle.ethnicityRestriction?.includes(user.ethnicity)
  )
    return false;
  if (
    circle.drinkingRestriction &&
    !circle.drinkingRestriction?.includes(user.drinking)
  )
    return false;
  if (
    circle.consumablesRestriction &&
    !circle.consumablesRestriction?.includes(user.consumables)
  )
    return false;
  if (
    circle.politicalBeliefsRestriction &&
    !circle.politicalBeliefsRestriction?.includes(user.politicalBeliefs)
  )
    return false;
  if (
    circle.levelOfEducationRestriction &&
    !circle.levelOfEducationRestriction?.includes(user.levelOfEducation)
  )
    return false;
  if (
    circle.purityRestriction &&
    !circle.purityRestriction?.includes(user.purity)
  )
    return false;
  if (
    circle.onlyLookingForTraditionalHouseholdRestriction &&
    !circle.onlyLookingForTraditionalHouseholdRestriction?.includes(
      user.onlyLookingForTraditionalHousehold
    )
  )
    return false;
  if (
    circle.incomeRestriction &&
    !circle.incomeRestriction?.includes(user.income)
  )
    return false;
  if (
    circle.maritalStatusRestriction &&
    !circle.maritalStatusRestriction?.includes(user.maritalStatus)
  )
    return false;
  if (
    circle.activityRestriction &&
    !circle.activityRestriction?.includes(user.activity)
  )
    return false;
  if (
    circle.religionRestriction &&
    !circle.religionRestriction?.includes(user.religion)
  )
    return false;
  return true;
};

export type CircleSchemaType = z.infer<typeof CircleSchema>;
