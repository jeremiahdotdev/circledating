import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { ReadCircleSchema } from "./Circle";
import { ReligionSchema } from "./Religion";
import { SelectedLocation } from "./SelectedLocationSchema";
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
