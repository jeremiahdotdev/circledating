import { CircleSchema } from "./Circle";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { GenderSchema } from "./Gender";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { ReligionSchema } from "./Religion";
import { SelectedLocation } from "./SelectedLocationSchema";
import { z } from "zod";

export const UserPreferencesSchema = z.object({
  userId: z.string(),
  ageRange: z.array(z.number()),
  sex: GenderSchema,
  selectedCircles: z.array(CircleSchema),
  searchContinents: z.array(SelectedLocation),
  searchCountries: z.array(SelectedLocation),
  searchStates: z.array(SelectedLocation),
  religion: z.array(ReligionSchema),
  politicalBeliefs: z.array(PoliticalBeliefsSchema),
  drinking: z.array(DrinkingSchema),
  consumables: z.array(ConsumablesSchema),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserPreferencesSchemaType = z.infer<typeof UserPreferencesSchema>;
