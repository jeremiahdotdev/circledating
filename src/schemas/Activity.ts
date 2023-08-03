import { Activity } from "@prisma/client";
import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export const ActivitiySchema = z.nativeEnum(Activity);

export const ActivitiySelectionValues: ComboboxOption<Activity>[] = [
  {
    label: "Infrequently; I excercise 0-1 times per week",
    value: Activity.INFREQUENT,
  },
  {
    label: "Mildly; I excercise 2-3 times per week",
    value: Activity.MILD,
  },
  {
    label: "Frequently; I excercise 3-4 times per week",
    value: Activity.FREQUENT,
  },
  {
    label: "Heavyily; I excercise 5+ times per week",
    value: Activity.HEAVY,
  },
  {
    label: "Never; I rarely excercise.",
    value: Activity.NEVER,
  },
];
