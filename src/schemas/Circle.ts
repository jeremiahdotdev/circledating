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

export const Circle = {
  id: z.string(),
  label: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  description: z.string().max(2000),
  isPrivate: z.boolean(),
  isFeatured: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  ageMaxRestriction: z.number().optional().nullable(),
  ageMinRestriction: z.number().optional().nullable(),
  maxWeightRestriction: z.number().optional().nullable(),
  sexRestriction: z.array(GenderSchema).optional(),
  continentRestriction: z.array(z.string()).optional(),
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
  links: z.array(LinkSchema).optional(),
  requests: z.array(RequestSchema).optional().nullable(),
  users: z
    .array(
      z.object({
        userId: z.string(),
      })
    )
    .optional()
    .nullable(),
};

export const CircleSchema = z.object(Circle);
export const CircleWithAggregatesSchema = z.object({
  ...Circle,
  _count: z.object({
    users: z.number().optional(),
  }),
});

import { LinkSchema } from "./Link";
import { ProfileSchemaType } from "./Profile";
import { RequestSchema } from "./Request";

export type CircleSchemaType = z.infer<typeof CircleSchema>;
export type CircleWithAggregatesSchemaType = z.infer<
  typeof CircleWithAggregatesSchema
>;

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
