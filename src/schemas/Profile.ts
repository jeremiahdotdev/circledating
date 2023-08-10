import {
  Activity,
  Children,
  Consumables,
  Continent,
  Drinking,
  Ethnicity,
  Gender,
  Income,
  LevelOfEducation,
  MaritalStatus,
  PoliticalBeliefs,
  Purity,
  Religion,
  YesNoOrUnknown,
} from "@prisma/client";
import { ActivitySchema } from "./Activity";
import { ChildrenSchema } from "./Children";
import { CircleSchema, DefaultCircles } from "./Circle";
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
  continent: ContinentSchema,
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

// TODO: Remove in release.
export const TEST_DATA: ProfileSchemaType[] = [
  {
    username: "J",
    sex: Gender.MALE,
    birthDate: new Date(1999, 4, 24),
    weight: 80.23,
    height: 198,
    continent: Continent.NORTH_AMERICA,
    location: {
      country: "America",
      state: "Virginia",
    },
    willingToRelocate: YesNoOrUnknown.YES,
    children: Children.HAS_NOT_AND_DOES_WANT,
    ethnicity: Ethnicity.WHITE,
    drinking: Drinking.NEVER,
    consumables: Consumables.NO_CONSUMABLES,
    politicalBeliefs: PoliticalBeliefs.CONSERVATIVE,
    levelOfEducation: LevelOfEducation.BACHELORS,
    purity: Purity.VIRGIN_WAITING,
    onlyLookingForTraditionalHousehold: YesNoOrUnknown.YES,
    income: Income.SINGLE,
    maritalStatus: MaritalStatus.NEVER_MARRIED,
    activity: Activity.INFREQUENT,
    religion: Religion.CHRISTIANITY,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum!",
    weightUnit: "KG",
    circles: [
      DefaultCircles.Religion.Christianity,
      DefaultCircles.Political.Conservative,
    ],
  },
  {
    username: "Tina 2.0",
    sex: Gender.FEMALE,
    birthDate: new Date(1998, 2, 24),
    weight: 80.23,
    height: 198,
    continent: Continent.NORTH_AMERICA,
    location: {
      country: "America",
      state: "Virginia",
    },
    willingToRelocate: YesNoOrUnknown.YES,
    children: Children.HAS_NOT_AND_DOES_WANT,
    ethnicity: Ethnicity.WHITE,
    drinking: Drinking.NEVER,
    consumables: Consumables.NO_CONSUMABLES,
    politicalBeliefs: PoliticalBeliefs.CONSERVATIVE,
    levelOfEducation: LevelOfEducation.BACHELORS,
    purity: Purity.VIRGIN_WAITING,
    onlyLookingForTraditionalHousehold: YesNoOrUnknown.YES,
    income: Income.SINGLE,
    maritalStatus: MaritalStatus.NEVER_MARRIED,
    activity: Activity.INFREQUENT,
    religion: Religion.CHRISTIANITY,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum!",
    weightUnit: "KG",
    circles: [
      DefaultCircles.Religion.Christianity,
      DefaultCircles.Political.Conservative,
    ],
  },
  {
    username: "Tina",
    sex: Gender.FEMALE,
    birthDate: new Date(1998, 2, 24),
    weight: 80.23,
    height: 198,
    continent: Continent.NORTH_AMERICA,
    location: {
      country: "America",
      state: "Virginia",
    },
    willingToRelocate: YesNoOrUnknown.YES,
    children: Children.HAS_NOT_AND_DOES_WANT,
    ethnicity: Ethnicity.WHITE,
    drinking: Drinking.NEVER,
    consumables: Consumables.NO_CONSUMABLES,
    politicalBeliefs: PoliticalBeliefs.LIBERAL,
    levelOfEducation: LevelOfEducation.BACHELORS,
    purity: Purity.VIRGIN_WAITING,
    onlyLookingForTraditionalHousehold: YesNoOrUnknown.YES,
    income: Income.SINGLE,
    maritalStatus: MaritalStatus.NEVER_MARRIED,
    activity: Activity.INFREQUENT,
    religion: Religion.CHRISTIANITY,
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum!",
    weightUnit: "KG",
    circles: [
      DefaultCircles.Religion.Christianity,
      DefaultCircles.Political.Conservative,
    ],
  },
];

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
