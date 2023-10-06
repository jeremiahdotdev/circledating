import {
  Consumables,
  Drinking,
  Gender,
  Income,
  PoliticalBeliefs,
  Prisma,
  Religion,
} from "@prisma/client";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import {
  ParseCircle,
  PrismaCircleType,
  ReadCircleSchema,
  ReadCircleSchemaType,
} from "./Circle";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { ReligionSchema } from "./Religion";
import { SelectedLocation } from "./SelectedLocationSchema";
import { parseArray } from "@/helpers/parseArray";
import { z } from "zod";

export const ReadUserPreferencesSchema = z.object({
  userId: z.string(),
  ageRange: z.array(z.number()).optional(),
  sex: GenderSchema,
  selectedCircles: z.array(ReadCircleSchema).optional(),
  searchContinents: z.array(SelectedLocation).nullable().optional(),
  searchCountries: z.array(SelectedLocation).nullable().optional(),
  searchStates: z.array(SelectedLocation).nullable().optional(),
  religion: z.array(ReligionSchema).nullable().optional(),
  politicalBeliefs: z.array(PoliticalBeliefsSchema).nullable().optional(),
  drinking: z.array(DrinkingSchema).nullable().optional(),
  consumables: z.array(ConsumablesSchema).nullable().optional(),
  income: z.array(IncomeSchema).nullable().optional(),
});

export const MutateUserPreferencesSchema = z.object({
  ...ReadUserPreferencesSchema.shape,
  userId: ReadUserPreferencesSchema.shape.userId.optional(),
  sex: ReadUserPreferencesSchema.shape.sex.optional(),
  ageRange: ReadUserPreferencesSchema.shape.ageRange.optional(),
});

export type ReadUserPreferencesSchemaType = z.infer<
  typeof ReadUserPreferencesSchema
>;
export type MutateUserPreferencesSchemaType = z.infer<
  typeof MutateUserPreferencesSchema
>;

export type PrismaPreferencesType = {
  userId: string;
  minAge: number;
  maxAge: number;
  sex: Gender | null;
  searchContinents: Prisma.JsonValue;
  searchCountries: Prisma.JsonValue;
  searchStates: Prisma.JsonValue;
  children: Prisma.JsonValue;
  ethnicity: Prisma.JsonValue;
  drinking: Prisma.JsonValue;
  consumables: Prisma.JsonValue;
  politicalBeliefs: Prisma.JsonValue;
  levelOfEducation: Prisma.JsonValue;
  purity: Prisma.JsonValue;
  income: Prisma.JsonValue;
  maritalStatus: Prisma.JsonValue;
  activity: Prisma.JsonValue;
  religion: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date | null;
  selectedCircles: { Circle: PrismaCircleType }[];
};

export function ParsePreferences(
  preferences: PrismaPreferencesType | undefined | null
): ReadUserPreferencesSchemaType | undefined {
  if (!preferences) return undefined;
  const circles: ReadCircleSchemaType[] = [];
  preferences?.selectedCircles?.forEach((c) => {
    const circle = ParseCircle(c.Circle);
    if (circle) {
      circles.push(circle);
    }
  });
  return {
    userId: preferences.userId,
    searchCountries: parseArray<string>(preferences.searchCountries),
    searchContinents: parseArray<string>(preferences.searchContinents),
    searchStates: parseArray<string>(preferences.searchStates),
    religion: parseArray<Religion>(preferences.religion),
    income: parseArray<Income>(preferences.income),
    //    activity: parseArray<Activity>(preferences.activity),
    //    children: parseArray<Children>(preferences.children),
    drinking: parseArray<Drinking>(preferences.drinking),
    //    ethnicity: parseArray<Ethnicity>(preferences.ethnicity),
    consumables: parseArray<Consumables>(preferences.consumables),
    //    maritalStatus: parseArray<MaritalStatus>(preferences.maritalStatus),
    //    levelOfEducation: parseArray<LevelOfEducation>(
    //      preferences.levelOfEducation
    //    ),
    politicalBeliefs: parseArray<PoliticalBeliefs>(
      preferences.politicalBeliefs
    ),
    sex: preferences.sex ?? Gender.MALE,
    selectedCircles: circles,
  };
}
