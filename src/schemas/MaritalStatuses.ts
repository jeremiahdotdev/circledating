import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
import { MaritalStatus } from "@prisma/client";
import { z } from "zod";

export const MaritalStatusesSchema = z.nativeEnum(MaritalStatus);

export const MaritalStatusesSelectionValues: ComboboxOption<MaritalStatus>[] = [
  {
    label: "Never",
    value: MaritalStatus.NEVER_MARRIED,
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

export const MaritalStatusesButtonOptions: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.NEVER,
    value: MaritalStatus.NEVER_MARRIED,
  },
  {
    variant: IconButtonVariant.WIDOWED,
    value: MaritalStatus.WIDOWED,
  },
  {
    variant: IconButtonVariant.DIVORCED,
    value: MaritalStatus.DIVORCED,
  },
];
