import { ButtonRowOptionType } from "@/components/ui/button-row";
import { Children, YesNoOrUnknown } from "@prisma/client";
import { ComboboxOption } from "@/components/ui/combobox";
import { IconButtonVariant } from "./Button";
import { z } from "zod";

export const ChildrenSchema = z.nativeEnum(Children);

export const ChildrenSelectionValues: ComboboxOption<Children>[] = [
  {
    label: "Has kids; wants more.",
    value: Children.HAS_AND_WANTS,
  },
  {
    label: "Has kids; Doesn't want more.",
    value: Children.HAS_AND_DOES_NOT_WANT,
  },
  {
    label: "Doesn't want kids.",
    value: Children.HAS_NOT_AND_DOES_NOT_WANT,
  },
  {
    label: "Wants kids.",
    value: Children.HAS_NOT_AND_DOES_WANT,
  },
];

export const ChildrenButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.CHILDREN_HAS_AND_WANTS,
    value: Children.HAS_AND_WANTS,
  },
  {
    variant: IconButtonVariant.CHILDREN_HAS_AND_DOES_NOT_WANT,
    value: Children.HAS_AND_DOES_NOT_WANT,
  },
  {
    variant: IconButtonVariant.CHILDREN_HAS_NOT_AND_DOES_NOT_WANT,
    value: Children.HAS_NOT_AND_DOES_NOT_WANT,
  },
  {
    variant: IconButtonVariant.CHILDREN_HAS_NOT_AND_DOES_WANT,
    value: Children.HAS_NOT_AND_DOES_WANT,
  },
];

export const ChildrenWantsButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.CHILDREN_WANTS,
    value: YesNoOrUnknown.YES,
  },
  {
    variant: IconButtonVariant.CHILDREN_WANTS_NOT,
    value: YesNoOrUnknown.NO,
  },
];

export const ChildrenHasButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.CHILDREN_HAS,
    value: YesNoOrUnknown.YES,
  },
  {
    variant: IconButtonVariant.CHILDREN_HAS_NOT,
    value: YesNoOrUnknown.NO,
  },
];
