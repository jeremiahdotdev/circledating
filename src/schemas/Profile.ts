import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { InteractionSchema } from "./Interaction";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { LinkSchema } from "./Link";
import {
  LocationSchema,
  SelectedLocationSchema,
} from "./SelectedLocationSchema";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import { MutateCircleSchema } from "./Circle";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";

export const ProfilePartial = {
  userId: z.string(),
  image: z.string().optional(),
  username: z.string().min(3).max(20),
  sex: GenderSchema,
  birthDate: z.date(),
  height: z.number().optional(), // Height in cm
  weight: z.number().optional(), // Weight in kg
  location: SelectedLocationSchema,
  willingToRelocate: YesAndNoSchema,
  children: ChildrenSchema,
  ethnicity: EthnicitySchema,
  drinking: DrinkingSchema,
  consumables: ConsumablesSchema,
  politicalBeliefs: PoliticalBeliefsSchema,
  levelOfEducation: LevelOfEducationSchema,
  purity: PuritySchema,
  income: IncomeSchema,
  maritalStatus: MaritalStatusesSchema,
  activity: ActivitySchema,
  religion: ReligionSchema,
  bio: z.string(),
  weightUnit: z.enum(["KG", "LBS"]),
  links: z.array(LinkSchema).optional().nullable(),
};
export const ProfilePartialSchema = z.object(ProfilePartial);

export const Profile = {
  ...ProfilePartial,
  circles: z.array(MutateCircleSchema).optional(),
  interactions: z.array(InteractionSchema).optional(),
  affections: z.array(InteractionSchema).optional(),
  location: LocationSchema.optional(),
  isPerfectMatch: z.boolean().optional(),
  likesYou: z.boolean().optional(),
};

export const ProfileSchema = z.object(Profile);

export const MutateProfileSchema = z.object({
  ...Profile,
  userId: z.string().optional(),
  location: LocationSchema,
});

export const UpdateImageSchema = z.object({
  userId: z.string(),
  image: z.string(),
});

export type MutateProfileSchemaType = z.infer<typeof MutateProfileSchema>;
export type UpdateImageSchemaType = z.infer<typeof UpdateImageSchema>;

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
export type ProfilePartialSchemaType = z.infer<typeof ProfilePartialSchema>;

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
