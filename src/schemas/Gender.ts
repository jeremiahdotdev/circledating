import { ComboboxOption } from "@/components/ui/combobox";
import { Gender } from "@prisma/client";
import { z } from "zod";

export const GenderSchema = z.nativeEnum(Gender);

export const GenderSelectionValues: ComboboxOption<Gender>[] = [
  {
    label: "Male",
    value: Gender.MALE,
  },
  {
    label: "Female",
    value: Gender.FEMALE,
  },
];
