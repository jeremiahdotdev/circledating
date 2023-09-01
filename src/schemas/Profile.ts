import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { CircleSchema } from "./Circle";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { InteractionSchema } from "./Interaction";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { SelectedLocationSchema } from "./SelectedLocationSchema";
import { UserPreferencesSchema } from "./UserPreferences";
import { YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";

export const ProfileSchema = z.object({
  userId: z.string().optional(),
  username: z.string().min(3).max(20),
  // Propably this should be the other users id not their username -> this would need to be done on the backend side of things
  usersNotToBeMatchedWith: z.string().optional(),
  sex: GenderSchema,
  birthDate: z.date(),
  height: z.number(), // Height in cm
  weight: z.number(), // Weight in kg
  location: SelectedLocationSchema,
  willingToRelocate: YesAndNoSchema,
  children: ChildrenSchema,
  ethnicity: EthnicitySchema,
  drinking: DrinkingSchema,
  consumables: ConsumablesSchema,
  politicalBeliefs: PoliticalBeliefsSchema,
  levelOfEducation: LevelOfEducationSchema,
  purity: PuritySchema,
  onlyLookingForTraditionalHousehold: YesAndNoSchema,
  income: IncomeSchema,
  maritalStatus: MaritalStatusesSchema,
  activity: ActivitySchema,
  religion: ReligionSchema,
  bio: z.string().optional(),
  weightUnit: z.enum(["KG", "LBS"]),
  circles: z.array(CircleSchema).nullable().optional(),
  interactions: z.array(InteractionSchema).nullable().optional(),
});

export const ReadProfileSchema = z.object({
  username: z.string(),
});
export const ReadProfilesSchema = z.object({
  currentUserProfile: ProfileSchema,
  currentUserPreferences: UserPreferencesSchema,
});
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
export type ReadProfileSchemaType = z.infer<typeof ReadProfileSchema>;
export type ReadProfilesSchemaType = z.infer<typeof ReadProfilesSchema>;
