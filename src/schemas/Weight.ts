import { z } from "zod";

export enum WeightUnit {
  LBS = "lbs",
  KGS = "kgs",
}

export const WeightUnitSchemaType = z.nativeEnum(WeightUnit);

export const WeightSchema = z.object({
  value: z.number().min(0).max(500),
  unit: WeightUnitSchemaType,
});

export type WeightSchemaType = z.infer<typeof WeightSchema>;
