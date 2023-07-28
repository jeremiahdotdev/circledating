import { z } from "zod";
import { HeightSchema } from "./Height";
import { BodyFormSchema } from "./BodyShape";
import { ConsumablesSchema } from "./Consumables";
import { CountrySchema } from "./Country";
import { DrinkingFeelingSchema } from "./DrinkingFeeling";
import { EthnicitySchema } from "./Ethnicity";
import { GenderSchema } from "./Gender";
import { LevelOfEducationSchema } from "./LevelOfEducation";
import { PoliticalBeliefsSchema } from "./PoliticalBeliefs";

export const ProfileSchema = z.object({
  username: z.string().min(3).max(20),
  sex: GenderSchema,
  // Some browsers return a string on an input with the type="number" attribute, so we need to allow that and convert it to a number in the backend.
  age: z.number().min(18).max(99).or(z.string().min(2).max(2)),
  youngestAgeToBeMatchedWith: z.number().min(18).max(99),
  oldestAgeToBeMatchedWith: z.number().min(18).max(99),
  height: HeightSchema,
  shortedToBeMatchedWith: HeightSchema,
  tallestToBeMatchedWith: HeightSchema,
  weight: z.number().min(0).max(500),
  location: CountrySchema,
  locationsWillingToMatchWith: z.array(CountrySchema),
  willingToRelocate: z.boolean(),
  wantsKids: z.boolean(),
  hasKids: z.boolean(),
  wantsToBeMatchedWithSomebodyWithKids: z.boolean(),
  bodyForm: BodyFormSchema,
  bodyFormToBeMatchedWith: z.array(BodyFormSchema),
  ethnicity: EthnicitySchema,
  exchangePicturesUpfront: z.boolean(),
  feelAboutDrinking: DrinkingFeelingSchema,
  consumables: ConsumablesSchema,
  acceptableConsumablesInAMatch: z.array(ConsumablesSchema),
  hasCurrentStruggles: z.boolean(),
  acceptsCurrentStruggles: z.boolean(),
  politicalBeliefs: PoliticalBeliefsSchema,
  politicalBeliefsOfMatch: z.array(PoliticalBeliefsSchema),
  levelOfEducation: LevelOfEducationSchema,
  isVirgin: z.boolean(),
  onlyWantsToBeMatchedWithVirgins: z.boolean(),
  onlyLookingForTraditionalHousehold: z.boolean(),
  canSupportFamilyOnCurrentIncome: z.boolean(),
  partnerShouldSupportOnCurrentIncome: z.boolean(),
  usersNotToBeMatchedWith: z.string().optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
