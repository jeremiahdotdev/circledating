import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { ConsumablesSchema } from "./Consumables";
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
import { useMemo } from "react";
import { z } from "zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const CircleSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  description: z.string().max(2000).optional().nullable(),
  sexRestriction: z.array(GenderSchema).optional(),
  ageMaxRestriction: z.number().optional().nullable(),
  ageMinRestriction: z.number().optional().nullable(),
  maxWeightRestriction: z.number().optional().nullable(),
  continentRestriction: z.array(z.string()).optional().nullable(),
  willingToRelocateRestriction: z.array(YesAndNoSchema).optional().nullable(),
  childrenRestriction: z.array(ChildrenSchema).optional().nullable(),
  ethnicityRestriction: z.array(EthnicitySchema).optional().nullable(),
  drinkingRestriction: z.array(DrinkingSchema).optional().nullable(),
  consumablesRestriction: z.array(ConsumablesSchema).optional().nullable(),
  politicalBeliefsRestriction: z
    .array(PoliticalBeliefsSchema)
    .optional()
    .nullable(),
  levelOfEducationRestriction: z
    .array(LevelOfEducationSchema)
    .optional()
    .nullable(),
  purityRestriction: z.array(PuritySchema).optional().nullable(),
  onlyLookingForTraditionalHouseholdRestriction: z
    .array(YesAndNoSchema)
    .optional()
    .nullable(),
  incomeRestriction: z.array(IncomeSchema).optional().nullable(),
  maritalStatusRestriction: z
    .array(MaritalStatusesSchema)
    .optional()
    .nullable(),
  activityRestriction: z.array(ActivitySchema).optional().nullable(),
  religionRestriction: z.array(ReligionSchema).optional().nullable(),
  customRestriction: z.array(CustomRestriction).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  links: z.array(LinkSchema).optional().nullable(),
  users: z
    .array(
      z.object({
        userId: z.string().optional(),
      })
    )
    .optional()
    .nullable(),
  _count: z
    .object({
      users: z.number().optional(),
    })
    .optional()
    .nullable(),
});

import { LinkSchema } from "./Link";
import { ProfileSchemaType } from "./Profile";

export type CircleSchemaType = z.infer<typeof CircleSchema>;

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
    !circle.continentRestriction?.includes(user.location.continent)
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
