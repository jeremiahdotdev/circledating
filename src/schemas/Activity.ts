import { z } from "zod";
import { ComboboxOption } from "@/components/ui/combobox";

export enum Activitiy {
  INFREQUENT = "infrequent",
  MILD = "mild",
  FREQUENT = "frequent",
  HEAVY = "heavy",
  NEVER = "never",
}

export const ActivitiySchema = z.nativeEnum(Activitiy);

export const ActivitiySelectionValues: ComboboxOption<string>[] = [
  {
    label: "Infrequently; I excercise 0-1 times per week",
    value: Activitiy.INFREQUENT,
  },
  {
    label: "Mildly; I excercise 2-3 times per week",
    value: Activitiy.MILD,
  },
  {
    label: "Frequently; I excercise 3-4 times per week",
    value: Activitiy.FREQUENT,
  },
  {
    label: "Heavyily; I excercise 5+ times per week",
    value: Activitiy.HEAVY,
  },
  {
    label: "Never; I rarely excercise.",
    value: Activitiy.NEVER,
  },
];
