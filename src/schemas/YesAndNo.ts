import { z } from "zod";
import { ComboboxOption } from "@/components/ui/combobox";

export enum YesAndNo {
  YES = "yes",
  NO = "no",
  UNKNOWN = "",
}

export const YesAndNoSchema = z.nativeEnum(YesAndNo);

export const YesAndNoSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Yes",
    value: YesAndNo.YES,
  },
  {
    label: "No",
    value: YesAndNo.NO,
  },
];

export const YesAndNoAndUnknownSelectionValues: ComboboxOption<string>[] = [
  {
    label: "Yes",
    value: YesAndNo.YES,
  },
  {
    label: "No",
    value: YesAndNo.NO,
  },
  {
    label: "I'd rather not say.",
    value: YesAndNo.UNKNOWN,
  },
];
