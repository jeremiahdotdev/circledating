import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
import { PoliticalBeliefs } from "@prisma/client";
import { z } from "zod";

export const PoliticalBeliefsSchema = z.nativeEnum(PoliticalBeliefs);

export const PoliticalBeliefsSelectionValues: ComboboxOption<PoliticalBeliefs>[] =
  [
    {
      label: "Conservative",
      value: PoliticalBeliefs.CONSERVATIVE,
    },
    // {
    //   label: "Conservative-leaning Moderate",
    //   value: PoliticalBeliefs.CONSERVATIVE_LEANING_MODERATE,
    // },
    {
      label: "Moderate",
      value: PoliticalBeliefs.MODERATE,
    },
    // {
    //   label: "Liberal-leaning Moderate",
    //   value: PoliticalBeliefs.LIBERAL_LEANING_MODERATE,
    // },
    {
      label: "Liberal",
      value: PoliticalBeliefs.LIBERAL,
    },
    {
      label: "Independent",
      value: PoliticalBeliefs.INDEPENDENT,
    },
    {
      label: "Apolitical",
      value: PoliticalBeliefs.APOLITICAL,
    },
  ];

export const PoliticalBeliefsButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.POLITIC_CONSERVATIVE,
    value: PoliticalBeliefs.CONSERVATIVE,
  },
  {
    variant: IconButtonVariant.POLITIC_MODERATE,
    value: PoliticalBeliefs.MODERATE,
  },
  {
    variant: IconButtonVariant.POLITIC_LIBERAL,
    value: PoliticalBeliefs.LIBERAL,
  },
  {
    variant: IconButtonVariant.POLITIC_INDEPENDENT,
    value: PoliticalBeliefs.INDEPENDENT,
  },
  {
    variant: IconButtonVariant.POLITIC_APOLITICAL,
    value: PoliticalBeliefs.APOLITICAL,
  },
];
