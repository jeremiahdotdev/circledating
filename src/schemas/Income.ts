import { ComboboxOption } from "@/components/ui/combobox";
import { Income } from "@prisma/client";
import { z } from "zod";

export const IncomeSchema = z.nativeEnum(Income);

export const IncomeSelectionValues: ComboboxOption<Income>[] = [
  {
    label: "I am looking for a single income household.",
    value: Income.SINGLE,
  },
  {
    label: "I am looking for a dual income household.",
    value: Income.DUAL,
  },
  {
    label: "I am open to either.",
    value: Income.EITHER,
  },
];
