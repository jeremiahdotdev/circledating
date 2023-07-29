import { z } from "zod";

export enum Ethnicity {
  WHITE = "white",
  BLACK_OR_AFRICAN_AMERICAN = "black_or_african_american",
  AMERICAN_INDIAN_OR_ALASKA_NATIVE = "american_indian_or_alaska_native",
  ASIAN = "asian",
  NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER = "native_hawaiian_or_other_pacific_islander",
  OTHER = "other",
}

export const EthnicitySchema = z.nativeEnum(Ethnicity);
