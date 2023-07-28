import { z } from "zod";

export enum BodyShape {
  OBESE = "obese",
  A_FEW_EXTRA_POUNDS = "a_few_extra_pounds",
  FIT = "fit",
  ATHLETIC = "athletic",
}

export const BodyFormSchema = z.nativeEnum(BodyShape);
