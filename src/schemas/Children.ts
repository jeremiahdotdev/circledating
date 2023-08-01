import { ComboboxOption } from "@/components/ui/combobox";
import { z } from "zod";

export enum Children {
  HAS_AND_WANTS = "has_and_wants",
  HAS_AND_DOES_NOT_WANT = "has_and_does_not_want",
  HAS_NOT_AND_DOES_NOT_WANT = "has_not_and_does_not_want",
  HAS_NOT_AND_DOES_WANT = "has_not_and_does_want",
}

export const ChildrenSchema = z.nativeEnum(Children);

export const ChildrenSelectionValues: ComboboxOption<string>[] = [
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
