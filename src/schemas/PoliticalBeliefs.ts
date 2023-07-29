import { z } from "zod";
import { ComboboxOption } from "@/components/ui/combobox";

export enum PoliticalBeliefs {
  CONSERVATIVE = "conservative",
  CONSERVATIVE_LEANING_MODERATE = "conservative-leaning_moderate",
  MODERATE = "moderate",
  LIBERAL_LEANING_MODERATE = "liberal-leaning_moderate",
  LIBERAL = "liberal",
  INDEPENDENT = "independent",
  APOLITICAL = "apolitical",
}

export const PoliticalBeliefsSchema = z.nativeEnum(PoliticalBeliefs);

export const PoliticalBeliefsSelectionValues: ComboboxOption<string>[] = [
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
