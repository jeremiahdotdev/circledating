import { DropdownSelectOption } from "@/components/ui/dropdown";
import { WeightUnit } from "@prisma/client";

export const WeightUnitOptions: DropdownSelectOption[] = [
  { value: WeightUnit.KG, label: "kg" },
  { value: WeightUnit.LBS, label: "lb" },
];
