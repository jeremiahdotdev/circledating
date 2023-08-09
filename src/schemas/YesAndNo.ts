import { ComboboxOption } from "@/components/ui/combobox";
import { YesNoOrUnknown } from "@prisma/client";
import { z } from "zod";

export const YesAndNoSchema = z.nativeEnum(YesNoOrUnknown);

export const YesAndNoSelectionValues: ComboboxOption<YesNoOrUnknown>[] = [
  {
    label: "Yes",
    value: YesNoOrUnknown.YES,
  },
  {
    label: "No",
    value: YesNoOrUnknown.NO,
  },
];

export const YesAndNoAndUnknownSelectionValues: ComboboxOption<YesNoOrUnknown>[] =
  [
    ...YesAndNoSelectionValues,
    {
      label: "I'd rather not say.",
      value: YesNoOrUnknown.UNKNOWN,
    },
  ];
