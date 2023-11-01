import { ButtonRowOptionType } from "@/components/ui/ButtonRowFormField";
import { Gender } from "@prisma/client";
import { IconButtonVariant } from "@/components/Shared/IconButton";
import { z } from "zod";

export const GenderSchema = z.nativeEnum(Gender);

export const GenderSelectionValues: ButtonRowOptionType[] = [
  {
    value: "boy",
    variant: IconButtonVariant.MALE,
  },
  {
    value: "girl",
    variant: IconButtonVariant.FEMALE,
  },
];

export const getOppositeSex = (sex?: Gender) => {
  if (sex == Gender.MALE) return Gender.FEMALE;
  return Gender.MALE;
};
