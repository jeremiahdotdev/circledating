import { Activitiy, ActivitiySchema } from "./Activity";
import { Children, ChildrenSchema } from "./Children";
import { Consumables, ConsumablesSchema } from "./Consumables";
import { CountrySchema } from "./Country";
import { Drinking, DrinkingSchema } from "./Drinking";
import { Ethnicity, EthnicitySchema } from "./Ethnicity";
import { Gender, GenderSchema } from "./Gender";
import { HeightSchema } from "./Height";
import { Income, IncomeSchema } from "./Income";
import { LevelOfEducation, LevelOfEducationSchema } from "./LevelOfEducation";
import { MaritalStatuses, MaritalStatusesSchema } from "./MaritalStatuses";
import { PoliticalBeliefs, PoliticalBeliefsSchema } from "./PoliticalBeliefs";
import { Purity, PuritySchema } from "./Purity";
import { Religion, ReligionSchema } from "./Religion";
import { WeightSchema } from "./Weight";
import { YesAndNo, YesAndNoSchema } from "./YesAndNo";
import { z } from "zod";

export const ProfileSchema = z.object({
  username: z.string().min(3).max(20),
  usersNotToBeMatchedWith: z.string().optional(),
  sex: GenderSchema,
  birthDate: z.date(),
  height: HeightSchema,
  weight: WeightSchema,
  location: CountrySchema,
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
  activity: ActivitiySchema,
  religion: ReligionSchema,
  bio: z.string().optional(),
});

export const TEST_DATA: ProfileSchemaType = {
  username: "test_user",
  sex: Gender.MALE,
  birthDate: new Date(1998, 2, 24),
  height: { unit: "cms", value: { feet: 6, inches: 2 } },
  weight: { unit: "lbs", value: 200 },
  location: {
    country: "America",
    states: "America",
  },
  willingToRelocate: YesAndNo.YES,
  children: Children.HAS_NOT_AND_DOES_WANT,
  ethnicity: Ethnicity.WHITE,
  drinking: Drinking.NEVER,
  consumables: Consumables.NONE,
  politicalBeliefs: PoliticalBeliefs.CONSERVATIVE,
  levelOfEducation: LevelOfEducation.BACHELORS,
  purity: Purity.VIRGIN_WAITING,
  onlyLookingForTraditionalHousehold: YesAndNo.YES,
  income: Income.SINGLE,
  maritalStatus: MaritalStatuses.NEVER,
  activity: Activitiy.FREQUENT,
  religion: Religion.CHRISTIANITY,
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum!",
};

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
