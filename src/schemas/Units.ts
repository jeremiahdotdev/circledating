import { ButtonRowOptionType } from "@/components/ui/button-row";
import { IconButtonVariant } from "./Button";
import { WeightUnit } from "@prisma/client";

export const WeightUnitButtonOptions: ButtonRowOptionType[] = [
  { value: WeightUnit.KG, variant: IconButtonVariant.KG },
  { value: WeightUnit.LBS, variant: IconButtonVariant.LBS },
];
