import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { Drinking } from "@prisma/client";
import { IconButtonVariant } from "./Button";
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

export const DrinkingButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.DRINKING_INFREQUENT,
    value: Drinking.INFREQUENT,
  },
  {
    variant: IconButtonVariant.DRINKING_MILD,
    value: Drinking.MILD,
  },
  {
    variant: IconButtonVariant.DRINKING_SOCIAL,
    value: Drinking.SOCIAL,
  },
  {
    variant: IconButtonVariant.DRINKING_FREQUENT,
    value: Drinking.FREQUENT,
  },
  {
    variant: IconButtonVariant.DRINKING_HEAVY,
    value: Drinking.HEAVY,
  },
  {
    variant: IconButtonVariant.DRINKING_NEVER,
    value: Drinking.NEVER,
  },
];
