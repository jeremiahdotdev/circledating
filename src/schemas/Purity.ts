import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
import { Purity } from "@prisma/client";
import { z } from "zod";

export const PuritySchema = z.nativeEnum(Purity);

export const PuritySelectionValues: ComboboxOption<Purity>[] = [
  {
    label: "Virgin; Waiting until marriage.",
    value: Purity.VIRGIN_WAITING,
  },
  {
    label: "Non-virgin; Waiting until marriage.",
    value: Purity.NOT_VIRGIN_WAITING,
  },
  {
    label: "Virgin; Not waiting until marriage.",
    value: Purity.VIRGIN_NOT_WAITING,
  },
  {
    label: "Non-virgin; Not waiting until marriage.",
    value: Purity.NOT_VIRGIN_NOT_WAITING,
  },
];

export const PurityButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.PURITY_VIRGIN_WAITING,
    value: Purity.VIRGIN_WAITING,
  },
  {
    variant: IconButtonVariant.PURITY_NOT_VIRGIN_WAITING,
    value: Purity.NOT_VIRGIN_WAITING,
  },
  {
    variant: IconButtonVariant.PURITY_VIRGIN_NOT_WAITING,
    value: Purity.VIRGIN_NOT_WAITING,
  },
  {
    variant: IconButtonVariant.PURITY_NOT_VIRGIN_NOT_WAITING,
    value: Purity.NOT_VIRGIN_NOT_WAITING,
  },
];
