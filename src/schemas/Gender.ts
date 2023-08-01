import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export const GenderSchema = z.nativeEnum(Gender);

export const GenderSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Male",
    value: Gender.MALE,
  },
  {
    label: "Female",
    value: Gender.FEMALE,
  },
];
