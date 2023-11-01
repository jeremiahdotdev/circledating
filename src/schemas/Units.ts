import { DropdownSelectOption } from "@/components/ui/dropdown";
import { IconButtonVariant } from "@/components/Shared/IconButton";
import { WeightUnit } from "@prisma/client";

export const WeightUnitOptions: DropdownSelectOption[] = [
  { value: WeightUnit.KG, variant: IconButtonVariant.KG, label: "kg" },
  { value: WeightUnit.LBS, variant: IconButtonVariant.LBS, label: "lb" },
];
