import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Purity {
  VIRGIN_WAITING = "virgin_waiting",
  NOTVIRGIN_WAITING = "notvirgin_waiting",
  VIRGIN_NOTWAITING = "virgin_notwaiting",
  NOTVIRGIN_NOTWAITING = "notvirgin_notwaiting",
  UNKNOWN = "unknown",
}

export const PuritySchema = z.nativeEnum(Purity);

export const PuritySelectionValues: ComboboxOption<string>[] = [
  {
    label: "Virgin; Waiting until marriage.",
    value: Purity.VIRGIN_WAITING,
  },
  {
    label: "Non-virgin; Waiting until marriage.",
    value: Purity.NOTVIRGIN_WAITING,
  },
  {
    label: "Virgin; Not waiting until marriage.",
    value: Purity.VIRGIN_NOTWAITING,
  },
  {
    label: "Non-virgin; Not waiting until marriage.",
    value: Purity.NOTVIRGIN_NOTWAITING,
  },
  {
    label: "I'd rather not say.",
    value: Purity.UNKNOWN,
  },
];
