import { ComboboxOption } from "@/components/ui/combobox";
import { Ethnicity } from "@prisma/client";
import { z } from "zod";

export const EthnicitySchema = z.nativeEnum(Ethnicity);

export const EthnicitySelectionValues: ComboboxOption<Ethnicity>[] = [
  {
    label: "White",
    value: Ethnicity.WHITE,
  },
  {
    label: "Black or African American",
    value: Ethnicity.BLACK_OR_AFRICAN_AMERICAN,
  },
  {
    label: "Asian",
    value: Ethnicity.ASIAN,
  },
  {
    label: "Native Hawaiian or Other Pacific Islander",
    value: Ethnicity.NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER,
  },
  {
    label: "American Indian or Alaska Native",
    value: Ethnicity.AMERICAN_INDIAN_OR_ALASKA_NATIVE,
  },
  {
    label: "Other",
    value: Ethnicity.OTHER,
  },
];
