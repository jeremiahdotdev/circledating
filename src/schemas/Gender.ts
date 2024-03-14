import { ButtonRowOptionType } from "@/components/ui/ButtonRowFormField";
import { Gender } from "@prisma/client";
import { IconButtonVariant } from "./Button";
import { z } from "zod";

export const GenderSchema = z.nativeEnum(Gender);

export const GenderSelectionButtonOptions: ButtonRowOptionType[] = [
  {
    value: Gender.MALE,
    variant: IconButtonVariant.MALE,
  },
  {
    value: Gender.FEMALE,
    variant: IconButtonVariant.FEMALE,
  },
];

export const getOppositeSex = (sex?: Gender) => {
  if (sex == Gender.MALE) return Gender.FEMALE;
  return Gender.MALE;
};
