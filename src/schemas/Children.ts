import { Children } from "@prisma/client";
import { ComboboxOption } from "@/components/ui/combobox";
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
