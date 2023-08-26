import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { CircleSchema } from "./Circle";
import { ConsumablesSchema } from "./Consumables";
import { ContinentSchema } from "./Continent";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { SelectedLocationSchema } from "./SelectedLocationSchema";
import { YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";

export const ProfileSchema = z.object({
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
  circles: z.array(CircleSchema),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
