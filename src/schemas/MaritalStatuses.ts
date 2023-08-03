import { ComboboxOption } from "@/components/ui/combobox";
import { MaritalStatus } from "@prisma/client";
import { z } from "zod";

export const MaritalStatusesSchema = z.nativeEnum(MaritalStatus);

export const MaritalStatusesSelectionValues: ComboboxOption<MaritalStatus>[] = [
  {
    label: "Never",
    value: MaritalStatus.NEVER,
  },
  {
    label: "Yes; Widowed",
    value: MaritalStatus.WIDOWED,
  },
  {
    label: "Yes; Divorced",
    value: MaritalStatus.DIVORCED,
  },
];
