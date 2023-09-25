import { CircleSchema } from "./Circle";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { ReligionSchema } from "./Religion";
import { SelectedLocation } from "./SelectedLocationSchema";
import { z } from "zod";

export const UserPreferencesSchema = z.object({
  userId: z.string(),
  ageRange: z.array(z.number()),
  sex: GenderSchema.nullable(),
  selectedCircles: z.array(CircleSchema).nullable(),
  searchContinents: z.array(SelectedLocation).nullable(),
  searchCountries: z.array(SelectedLocation).nullable(),
  searchStates: z.array(SelectedLocation).nullable(),
  religion: z.array(ReligionSchema).nullable(),
  politicalBeliefs: z.array(PoliticalBeliefsSchema).nullable(),
  drinking: z.array(DrinkingSchema).nullable(),
  consumables: z.array(ConsumablesSchema).nullable(),
  income: z.array(IncomeSchema).nullable(),

  createdAt: z.date(),
  updatedAt: z.date().nullable().optional(),
});

export type UserPreferencesSchemaType = z.infer<typeof UserPreferencesSchema>;
