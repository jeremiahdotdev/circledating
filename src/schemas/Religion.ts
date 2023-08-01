import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Religion {
  AGNOSTICISM = "agnosticism",
  ATHEISM = "atheism",
  BUDDHISM = "buddhism",
  CHRISTIANITY = "christianity",
  HINDUISM = "hinduism",
  JUDIASM = "judiasm",
  MORMONISM = "mormonism",
  OTHER = "other",
}

export const ReligionSchema = z.nativeEnum(Religion);

export const ReligionSelectionValues: ComboboxOption<string>[] = [
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
