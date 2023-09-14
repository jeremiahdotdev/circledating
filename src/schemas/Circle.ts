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
  code: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  ageMaxRestriction: z.number().optional().nullable(),
  ageMinRestriction: z.number().optional().nullable(),
  maxWeightRestriction: z.number().optional().nullable(),
  sexRestriction: z.array(GenderSchema).optional(),
  countryRestriction: z.array(z.string()).optional(),
  childrenRestriction: z.array(ChildrenSchema).optional(),
  ethnicityRestriction: z.array(EthnicitySchema).optional(),
  drinkingRestriction: z.array(DrinkingSchema).optional(),
  consumablesRestriction: z.array(ConsumablesSchema).optional(),
  politicalBeliefsRestriction: z.array(PoliticalBeliefsSchema).optional(),
  levelOfEducationRestriction: z.array(LevelOfEducationSchema).optional(),
  purityRestriction: z.array(PuritySchema).optional(),
  incomeRestriction: z.array(IncomeSchema).optional(),
  maritalStatusRestriction: z.array(MaritalStatusesSchema).optional(),
  activityRestriction: z.array(ActivitySchema).optional(),
  religionRestriction: z.array(ReligionSchema).optional(),
  customRestriction: z.array(CustomRestriction).optional(),
  links: z.array(LinkSchema).optional(),
  requests: z.array(RequestSchema).optional().nullable(),
  users: z.array(UserCircleSchema).optional().nullable(),
};

export const CircleSchema = z.object(Circle);

export const CreateCircleSchema = z.object({
  ...Circle,
  id: Circle.id.optional(),
  name: Circle.name.optional(),
  code: Circle.code.optional(),
  links: z.string(),
  updatedAt: Circle.updatedAt.optional(),
  createdAt: Circle.createdAt.optional(),
});

export const CircleWithAggregatesSchema = z.object({
  ...Circle,
  _count: z.object({
    users: z.number().optional(),
  }),
});

import { LinkSchema } from "./Link";
import { RequestSchema } from "./Request";
import { UserCircleSchema } from "./UserCircle";

export type CircleSchemaType = z.infer<typeof CircleSchema>;
export type CreateCircleSchemaType = z.infer<typeof CreateCircleSchema>;
export type CircleWithAggregatesSchemaType = z.infer<
  typeof CircleWithAggregatesSchema
>;
