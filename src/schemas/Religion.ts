import { ComboboxOption } from "@/components/ui/combobox";
import { Religion } from "@prisma/client";
import { z } from "zod";

export const ReligionSchema = z.nativeEnum(Religion);

export const ReligionSelectionValues: ComboboxOption<Religion>[] = [
  {
    label: "Christian",
    value: Religion.CHRISTIANITY,
  },
  {
    label: "Mormon",
    value: Religion.MORMONISM,
  },
  {
    label: "Agnostic",
    value: Religion.AGNOSTICISM,
  },
  {
    label: "Atheist",
    value: Religion.ATHEISM,
  },
  {
    label: "Buddhist",
    value: Religion.BUDDHISM,
  },
  {
    label: "Hindi",
    value: Religion.HINDUISM,
  },
  {
    label: "Other/Spiritual",
    value: Religion.OTHER,
  },
];
