import { z } from "zod";

export const CustomRestriction = z.object({
  customLabel: z.string().min(3).max(20),
  customRestrictionResponse: z.string().min(3).max(20),
});

export type CustomRestrictionType = z.infer<typeof CustomRestriction>;
