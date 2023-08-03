import { ComboboxOption } from "@/components/ui/combobox";
import { Drinking } from "@prisma/client";
import { z } from "zod";

export const DrinkingSchema = z.nativeEnum(Drinking);

export const DrinkingSelectionValues: ComboboxOption<Drinking>[] = [
  {
    label: "Infrequently; I drink maybe a few times per year.",
    value: Drinking.INFREQUENT,
  },
  {
    label: "Mildly; I drink maybe a few times per month.",
    value: Drinking.MILD,
  },
  {
    label: "Socially; I drink at events, but rarely otherwise.",
    value: Drinking.SOCIAL,
  },
  {
    label: "Frequently; I drink on a weekly basis.",
    value: Drinking.FREQUENT,
  },
  {
    label: "Heavily; I drink on an almost daily basis.",
    value: Drinking.HEAVY,
  },
  {
    label: "Never.",
    value: Drinking.NEVER,
  },
];
