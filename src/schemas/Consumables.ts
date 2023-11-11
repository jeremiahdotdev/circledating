import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { Consumables } from "@prisma/client";
import { IconButtonVariant } from "./Button";
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

export const ConsumablesButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.CONSUMABLES_SMOKING,
    value: Consumables.SMOKING,
  },
  {
    variant: IconButtonVariant.CONSUMABLES_VAPING,
    value: Consumables.VAPING,
  },
  {
    variant: IconButtonVariant.CONSUMABLES_OCCASIONAL_CIGARS,
    value: Consumables.OCCASIONAL_CIGARS,
  },
  {
    variant: IconButtonVariant.CONSUMABLES_EDIBLES_GUMMIES,
    value: Consumables.EDIBLES_GUMMIES,
  },
  {
    variant: IconButtonVariant.CONSUMABLES_NO_CONSUMABLES,
    value: Consumables.NO_CONSUMABLES,
  },
];
