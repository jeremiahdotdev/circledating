import { ButtonRowOptionType } from "@/components/ui/button-row";
import { Height, Weight } from "@prisma/client";
import { IconButtonVariant } from "./Button";
import { z } from "zod";

export const WeightShapeSchema = z.nativeEnum(Weight);
export const HeightShapeSchema = z.nativeEnum(Height);

export const WeightShapeSchemaButtonValuesMen: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.BODY_MALE_THIN,
    value: Weight.THIN,
  },
  {
    variant: IconButtonVariant.BODY_MALE_FIT,
    value: Weight.FIT,
  },
  {
    variant: IconButtonVariant.BODY_MALE_EXTRA,
    value: Weight.EXTRA,
  },
  {
    variant: IconButtonVariant.BODY_MALE_HEAVY,
    value: Weight.HEAVY,
  },
];

export const WeightShapeSchemaButtonValuesWomen: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.BODY_FEMALE_THIN,
    value: Weight.THIN,
  },
  {
    variant: IconButtonVariant.BODY_FEMALE_FIT,
    value: Weight.FIT,
  },
  {
    variant: IconButtonVariant.BODY_FEMALE_EXTRA,
    value: Weight.EXTRA,
  },
  {
    variant: IconButtonVariant.BODY_FEMALE_HEAVY,
    value: Weight.HEAVY,
  },
];

export const HeightShapeSchemaButtonValues: ButtonRowOptionType[] = [
  {
    variant: IconButtonVariant.BODY_VERY_SHORT,
    value: Height.VERY_SHORT,
  },
  {
    variant: IconButtonVariant.BODY_SHORT,
    value: Height.SHORT,
  },
  {
    variant: IconButtonVariant.BODY_AVERAGE,
    value: Height.AVERAGE,
  },
  {
    variant: IconButtonVariant.BODY_TALL,
    value: Height.TALL,
  },
  {
    variant: IconButtonVariant.BODY_VERY_TALL,
    value: Height.VERY_TALL,
  },
];
