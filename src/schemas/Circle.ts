import {
  Activity,
  Children,
  Consumables,
  Drinking,
  Ethnicity,
  Gender,
  Income,
  LevelOfEducation,
  MaritalStatus,
  PoliticalBeliefs,
  Prisma,
  Purity,
  Religion,
} from "@prisma/client";
import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { ConsumablesSchema } from "./Consumables";
import { CustomRestriction } from "./CustomRestriction";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { LinkSchema, LinkSchemaType } from "./Link";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { ReportSchema } from "./Report";
import { RequestSchema } from "./Request";
import { UserCircleSchema } from "./UserCircle";
import { parseArray } from "@/helpers/parseArray";
import { z } from "zod";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const Circle = {
  id: z.string(),
  label: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  image: z.string().optional(),
  description: z.string().max(2000),
  isPrivate: z.boolean(),
  isFeatured: z.boolean(),
  code: z.string().optional(),
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
  reports: z.array(ReportSchema).optional().nullable(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
};

export const ReadCircleSchema = z.object({
  ...Circle,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  _count: z
    .object({
      users: z.number().optional(),
    })
    .optional(),
});

export const MutateCircleSchema = z.object({
  ...Circle,
  id: Circle.id.optional(),
  links: z.array(LinkSchema).optional(),
});

export const UpdateImageSchema = z.object({
  id: z.string(),
  image: z.string(),
});

export const CircleUserSearchSchema = z.object({
  circleId: z.string(),
  usernamePartial: z.string(),
});

export const CircleUserSchema = z.object({
  circleId: z.string(),
  userId: z.string(),
});

export type ReadCircleSchemaType = z.infer<typeof ReadCircleSchema>;
export type MutateCircleSchemaType = z.infer<typeof MutateCircleSchema>;
export type UpdateImageSchemaType = z.infer<typeof UpdateImageSchema>;
export type CircleUserSearchSchemaType = z.infer<typeof CircleUserSearchSchema>;
export type CircleUserSchemaType = z.infer<typeof CircleUserSchema>;

export type PrismaCircleType = {
  id: string;
  name: string;
  label: string;
  image: string | null;
  description: string;
  isFeatured: boolean;
  isPrivate: boolean;
  code: string;
  ageMaxRestriction: number | null;
  ageMinRestriction: number | null;
  maxWeightRestriction: number | null;
  sexRestriction: Prisma.JsonValue;
  countryRestriction: Prisma.JsonValue;
  childrenRestriction: Prisma.JsonValue;
  ethnicityRestriction: Prisma.JsonValue;
  drinkingRestriction: Prisma.JsonValue;
  consumablesRestriction: Prisma.JsonValue;
  politicalBeliefsRestriction: Prisma.JsonValue;
  levelOfEducationRestriction: Prisma.JsonValue;
  purityRestriction: Prisma.JsonValue;
  incomeRestriction: Prisma.JsonValue;
  maritalStatusRestriction: Prisma.JsonValue;
  activityRestriction: Prisma.JsonValue;
  religionRestriction: Prisma.JsonValue;
  links: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date | null;
};

export function ParseCircle(
  circle: PrismaCircleType | undefined | null
): ReadCircleSchemaType | undefined {
  if (!circle) return undefined;
  return {
    ...circle,
    id: circle.id ?? "",
    image: circle.image ?? "",
    religionRestriction: parseArray<Religion>(circle.religionRestriction),
    sexRestriction: parseArray<Gender>(circle.sexRestriction),
    incomeRestriction: parseArray<Income>(circle.incomeRestriction),
    purityRestriction: parseArray<Purity>(circle.purityRestriction),
    activityRestriction: parseArray<Activity>(circle.activityRestriction),
    childrenRestriction: parseArray<Children>(circle.childrenRestriction),
    drinkingRestriction: parseArray<Drinking>(circle.drinkingRestriction),
    countryRestriction: parseArray<string>(circle.countryRestriction),
    ethnicityRestriction: parseArray<Ethnicity>(circle.ethnicityRestriction),
    consumablesRestriction: parseArray<Consumables>(
      circle.consumablesRestriction
    ),
    maritalStatusRestriction: parseArray<MaritalStatus>(
      circle.maritalStatusRestriction
    ),
    levelOfEducationRestriction: parseArray<LevelOfEducation>(
      circle.levelOfEducationRestriction
    ),
    politicalBeliefsRestriction: parseArray<PoliticalBeliefs>(
      circle.politicalBeliefsRestriction
    ),
    links: parseArray<LinkSchemaType>(circle.politicalBeliefsRestriction),
    updatedAt:
      circle.updatedAt?.toLocaleDateString() ??
      circle.createdAt?.toLocaleDateString() ??
      "",
    createdAt: circle.createdAt?.toLocaleDateString() ?? "",
  };
}

export function ParseCircles(
  circles: PrismaCircleType[] | undefined | null
): ReadCircleSchemaType[] {
  const result: ReadCircleSchemaType[] = [];
  if (circles) {
    circles.forEach((circle) => {
      const parsedValue = ParseCircle(circle);
      if (parsedValue) result.push(parsedValue);
    });
  }
  return result;
}
