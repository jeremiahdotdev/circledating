import { ComboboxOption } from "@/components/ui/combobox";
import { PoliticalBeliefs } from "@prisma/client";
import { z } from "zod";

export const PoliticalBeliefsSchema = z.nativeEnum(PoliticalBeliefs);

export const PoliticalBeliefsSelectionValues: ComboboxOption<PoliticalBeliefs>[] =
  [
    {
      label: "Conservative",
      value: PoliticalBeliefs.CONSERVATIVE,
    },
    {
      label: "Conservative-leaning Moderate",
      value: PoliticalBeliefs.CONSERVATIVE_LEANING_MODERATE,
    },
    {
      label: "Moderate",
      value: PoliticalBeliefs.MODERATE,
    },
    {
      label: "Liberal-leaning Moderate",
      value: PoliticalBeliefs.LIBERAL_LEANING_MODERATE,
    },
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
