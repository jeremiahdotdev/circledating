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
import { LinkSchema } from "./Link";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { SelectedLocationSchema } from "./SelectedLocationSchema";
import { YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";

export const ProfilePartial = {
  userId: z.string(),
  username: z.string().min(3).max(20),
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
  bio: z.string(),
  weightUnit: z.enum(["KG", "LBS"]),
};
export const ProfilePartialSchema = z.object(ProfilePartial);

export const Profile = {
  ...ProfilePartial,
  circles: z.array(CircleSchema).optional(),
  interactions: z.array(InteractionSchema).optional(),
  links: z.array(LinkSchema).optional(),
};
export const ProfileSchema = z.object(Profile);

export const CreateProfileSchema = z.object({
  ...Profile,
  userId: z.string().optional(),
});

export type CreateProfileSchemaType = z.infer<typeof CreateProfileSchema>;
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export function isProfile(x: unknown): x is ProfileSchemaType {
  return (
    typeof x === "object" &&
    x != null &&
    !!(x as ProfileSchemaType).activity &&
    !!(x as ProfileSchemaType).bio &&
    !!(x as ProfileSchemaType).birthDate &&
    !!(x as ProfileSchemaType).children &&
    !!(x as ProfileSchemaType).circles &&
    !!(x as ProfileSchemaType).consumables &&
    !!(x as ProfileSchemaType).drinking &&
    !!(x as ProfileSchemaType).ethnicity &&
    !!(x as ProfileSchemaType).height &&
    !!(x as ProfileSchemaType).income &&
    !!(x as ProfileSchemaType).interactions &&
    !!(x as ProfileSchemaType).levelOfEducation &&
    !!(x as ProfileSchemaType).links &&
    !!(x as ProfileSchemaType).location &&
    !!(x as ProfileSchemaType).maritalStatus &&
    !!(x as ProfileSchemaType).onlyLookingForTraditionalHousehold &&
    !!(x as ProfileSchemaType).politicalBeliefs &&
    !!(x as ProfileSchemaType).purity &&
    !!(x as ProfileSchemaType).religion &&
    !!(x as ProfileSchemaType).sex &&
    !!(x as ProfileSchemaType).userId &&
    !!(x as ProfileSchemaType).username &&
    !!(x as ProfileSchemaType).weight &&
    !!(x as ProfileSchemaType).weightUnit &&
    !!(x as ProfileSchemaType).willingToRelocate
  );
}
