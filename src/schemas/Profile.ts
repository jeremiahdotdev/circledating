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
  WeightUnit,
  YesNoOrUnknown,
} from "@prisma/client";
import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { ConsumablesSchema } from "./Consumables";
import { DrinkingSchema } from "./Drinking";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { IncomeSchema } from "./Income";
import { InteractionSchema } from "./Interaction";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { LinkSchema, LinkSchemaType } from "./Link";
import {
  LocationSchema,
  SelectedLocationSchema,
} from "./SelectedLocationSchema";
import { MaritalStatusesSchema } from "./MaritalStatuses";
import {
  ParseCircle,
  PrismaCircleType,
  ReadCircleSchema,
  ReadCircleSchemaType,
} from "./Circle";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { PuritySchema } from "./Purity";
import { ReligionSchema } from "./Religion";
import { YesAndNoSchema } from "./YesAndNo";
import { parseArray } from "@/helpers/parseArray";
import { z } from "zod";
import dayjs from "dayjs";

export const ProfilePartialSchema = z.object({
  userId: z.string(),
  image: z.string().optional(),
  username: z.string().min(3).max(20),
  sex: GenderSchema,
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
  circles: z.array(ReadCircleSchema).optional(),
  interactions: z.array(InteractionSchema).optional().nullable(),
  affections: z.array(InteractionSchema).optional().nullable(),
});

export const ReadProfileSchema = z.object({
  ...ProfilePartialSchema.shape,
  height: z.number().optional().nullable(), // Height in cm
  weight: z.number().optional().nullable(), // Weight in kg
  location: LocationSchema.optional().nullable(),
  isPerfectMatch: z.boolean().optional(),
  likesYou: z.boolean().optional(),
  age: z.number(),
  birthDate: z.date().nullable(),
});

export const MutateProfileSchema = z.object({
  ...ProfilePartialSchema.shape,
  userId: z.string().optional(),
  location: LocationSchema,
  birthDate: z.date(),
});

export const UpdateImageSchema = z.object({
  userId: z.string(),
  image: z.string(),
});

export type MutateProfileSchemaType = z.infer<typeof MutateProfileSchema>;
export type UpdateImageSchemaType = z.infer<typeof UpdateImageSchema>;

export type ReadProfileSchemaType = z.infer<typeof ReadProfileSchema>;
export type ProfilePartialSchemaType = z.infer<typeof ProfilePartialSchema>;

export function isProfile(x: unknown): x is ReadProfileSchemaType {
  return (
    typeof x === "object" &&
    x != null &&
    !!(x as ReadProfileSchemaType).activity &&
    !!(x as ReadProfileSchemaType).bio &&
    !!(x as ReadProfileSchemaType).children &&
    !!(x as ReadProfileSchemaType).circles &&
    !!(x as ReadProfileSchemaType).consumables &&
    !!(x as ReadProfileSchemaType).drinking &&
    !!(x as ReadProfileSchemaType).ethnicity &&
    !!(x as ReadProfileSchemaType).height &&
    !!(x as ReadProfileSchemaType).income &&
    !!(x as ReadProfileSchemaType).interactions &&
    !!(x as ReadProfileSchemaType).levelOfEducation &&
    !!(x as ReadProfileSchemaType).links &&
    !!(x as ReadProfileSchemaType).location &&
    !!(x as ReadProfileSchemaType).maritalStatus &&
    !!(x as ReadProfileSchemaType).politicalBeliefs &&
    !!(x as ReadProfileSchemaType).purity &&
    !!(x as ReadProfileSchemaType).religion &&
    !!(x as ReadProfileSchemaType).sex &&
    !!(x as ReadProfileSchemaType).userId &&
    !!(x as ReadProfileSchemaType).username &&
    !!(x as ReadProfileSchemaType).weight &&
    !!(x as ReadProfileSchemaType).weightUnit &&
    !!(x as ReadProfileSchemaType).willingToRelocate
  );
}

export type PrismaProfileType = {
  location:
    | {
        id: string;
        continent: string;
        country: string;
        state: string | null;
      }
    | undefined;
  circles:
    | {
        Circle: PrismaCircleType | undefined;
      }[]
    | undefined;
  interactions:
    | {
        affectedUserId: string;
      }[]
    | undefined;
} & {
  userId: string;
  username: string;
  image: string | null;
  sex: Gender;
  birthDate: Date;
  height: number | null;
  weight: number | null;
  locationId: string;
  willingToRelocate: YesNoOrUnknown;
  children: Children;
  ethnicity: Ethnicity;
  drinking: Drinking;
  consumables: Consumables;
  politicalBeliefs: PoliticalBeliefs;
  levelOfEducation: LevelOfEducation;
  purity: Purity;
  income: Income;
  maritalStatus: MaritalStatus;
  activity: Activity;
  religion: Religion;
  bio: string;
  weightUnit: WeightUnit;
  links: Prisma.JsonValue;
};

export function ParseProfile(
  profile: PrismaProfileType | undefined | null
): ReadProfileSchemaType | undefined {
  if (!profile) return undefined;
  const circles: ReadCircleSchemaType[] = [];
  profile?.circles?.forEach((c) => {
    const circle = ParseCircle(c.Circle);
    if (circle) {
      circles.push(circle);
    }
  });
  return {
    userId: profile.userId,
    username: profile.username,
    sex: profile.sex,
    bio: profile.bio,
    height: profile.height,
    weight: profile.weight,
    weightUnit: profile.weightUnit,
    willingToRelocate: profile.willingToRelocate,
    children: profile.children,
    drinking: profile.drinking,
    ethnicity: profile.ethnicity,
    consumables: profile.consumables,
    politicalBeliefs: profile.politicalBeliefs,
    levelOfEducation: profile.levelOfEducation,
    purity: profile.purity,
    income: profile.income,
    maritalStatus: profile.maritalStatus,
    activity: profile.activity,
    religion: profile.religion,
    image: profile.image ?? "",
    age: dayjs().diff(profile.birthDate, "year"),
    links: parseArray<LinkSchemaType>(profile.links),
    circles: circles,
    birthDate: null,
    likesYou: !!profile.interactions?.length,
  };
}
