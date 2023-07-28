import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Gender {
  male = "male",
  female = "female",
}

export const GenderSchema = z.nativeEnum(Gender);

export const GenderSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Male",
    value: Gender.male,
  },
  {
    label: "Female",
    value: Gender.female,
  },
];
