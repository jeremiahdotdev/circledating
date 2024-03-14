import { ButtonRowOptionType } from "@/components/ui/button-row";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
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
    label: "Judaism",
    value: Religion.JUDAISM,
  },
  {
    label: "Islam",
    value: Religion.ISLAM,
  },
  {
    label: "Other/Spiritual",
    value: Religion.OTHER,
  },
];

export const ReligionButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.RELIGION_CHRISTIANITY,
    value: Religion.CHRISTIANITY,
  },
  {
    variant: IconButtonVariant.RELIGION_MORMONISM,
    value: Religion.MORMONISM,
  },
  {
    variant: IconButtonVariant.RELIGION_AGNOSTICISM,
    value: Religion.AGNOSTICISM,
  },
  {
    variant: IconButtonVariant.RELIGION_ATHEISM,
    value: Religion.ATHEISM,
  },
  {
    variant: IconButtonVariant.RELIGION_BUDDHISM,
    value: Religion.BUDDHISM,
  },
  {
    variant: IconButtonVariant.RELIGION_HINDUISM,
    value: Religion.HINDUISM,
  },
  {
    variant: IconButtonVariant.RELIGION_JUDAISM,
    value: Religion.JUDAISM,
  },
  {
    variant: IconButtonVariant.RELIGION_ISLAM,
    value: Religion.ISLAM,
  },
  {
    variant: IconButtonVariant.RELIGION_OTHER,
    value: Religion.OTHER,
  },
];
