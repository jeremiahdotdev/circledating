import { ButtonRowOptionType } from "@/components/ui/button-row";
import { IconButtonVariant } from "./Button";
import { z } from "zod";

export enum BodyShape {
  HEAVY = "heavy",
  EXTRA = "extra",
  FIT = "fit",
  THIN = "body",
}

export const BodyFormSchema = z.nativeEnum(BodyShape);

export const BodyShapeButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.BODY_THIN,
    value: BodyShape.THIN,
  },
  {
    variant: IconButtonVariant.BODY_FIT,
    value: BodyShape.FIT,
  },
  {
    variant: IconButtonVariant.BODY_EXTRA,
    value: BodyShape.EXTRA,
  },
  {
    variant: IconButtonVariant.BODY_HEAVY,
    value: BodyShape.HEAVY,
  },
];
