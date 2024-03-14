import { Activity } from "@prisma/client";
import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
import { z } from "zod";

export const ActivitySchema = z.nativeEnum(Activity);

export const ActivitySelectionValues: ComboboxOption<Activity>[] = [
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

export const ActivityButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.ACTIVITY_NEVER,
    value: Activity.NEVER,
  },
  {
    variant: IconButtonVariant.ACTIVITY_INFREQUENT,
    value: Activity.INFREQUENT,
  },
  {
    variant: IconButtonVariant.ACTIVITY_MILD,
    value: Activity.MILD,
  },
  {
    variant: IconButtonVariant.ACTIVITY_FREQUENT,
    value: Activity.FREQUENT,
  },
  {
    variant: IconButtonVariant.ACTIVITY_HEAVY,
    value: Activity.HEAVY,
  },
];
