import { z } from "zod";

export const WeightSchema = z.object({
  value: z.number().min(0).max(500),
  unit: z.string(),
});

export type WeightSchemaType = z.infer<typeof WeightSchema>;
