import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum MaritalStatuses {
  NEVER = "never",
  WIDOWED = "widowed",
  DIVORCED = "divorced",
}

export const MaritalStatusesSchema = z.nativeEnum(MaritalStatuses);

export const MaritalStatusesSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Never",
    value: MaritalStatuses.NEVER,
  },
  {
    label: "Yes; Widowed",
    value: MaritalStatuses.WIDOWED,
  },
  {
    label: "Yes; Divorced",
    value: MaritalStatuses.DIVORCED,
  },
];
