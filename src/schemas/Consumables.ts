import { ComboboxOption } from "@/components/ui/combobox";
import { Consumables } from "@prisma/client";
import { z } from "zod";

export const ConsumablesSchema = z.nativeEnum(Consumables);

export const ConsumablesSelectionValues: ComboboxOption<Consumables>[] = [
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
    value: Consumables.NO_CONSUMABLES,
  },
];
