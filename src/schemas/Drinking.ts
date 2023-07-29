import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Drinking {
  INFREQUENT = "infrequent",
  MILD = "mild",
  SOCIAL = "social",
  FREQUENT = "frequent",
  HEAVY = "heavy",
  NEVER = "never",
}

export const DrinkingSchema = z.nativeEnum(Drinking);

export const DrinkingSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Infrequently; I drink maybe a few times per year.",
    value: Drinking.INFREQUENT,
  },
  {
    label: "Mildly; I drink maybe a few times per month.",
    value: Drinking.MILD,
  },
  {
    label: "Socially; I drink at events, but rarily otherwise.",
    value: Drinking.SOCIAL,
  },
  {
    label: "Frequently; I drink on a weekly basis.",
    value: Drinking.FREQUENT,
  },
  {
    label: "Heavyily; I drink on an almost daily basis.",
    value: Drinking.HEAVY,
  },
  {
    label: "Never.",
    value: Drinking.NEVER,
  },
];
