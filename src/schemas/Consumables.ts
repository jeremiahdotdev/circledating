import { z } from "zod";
import { ComboboxOption } from "@/components/ui/combobox";

export enum Consumables {
  SMOKING = "smoking",
  VAPING = "vaping",
  OCCASIONAL_CIGARS = "occasional_cigars",
  EDIBLES_GUMMIES = "edibles_gummies",
  NONE = "none",
}

export const ConsumablesSchema = z.nativeEnum(Consumables);

export const ConsumablesSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Smoking/Cigarettes",
    value: Consumables.SMOKING,
  },
  {
    label: "Vaping",
    value: Consumables.VAPING,
  },
  {
    label: "Occasional Cigars",
    value: Consumables.OCCASIONAL_CIGARS,
  },
  {
    label: "Edibles/Gummies",
    value: Consumables.EDIBLES_GUMMIES,
  },
  {
    label: "None",
    value: Consumables.NONE,
  },
];
