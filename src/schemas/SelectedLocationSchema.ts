import { flattenedLocations } from "@/globals/location";
import { z } from "zod";

export const SelectedLocationSchema = z.object({
  continent: z.string(),
  country: z.string(),
  state: z.string(),
});

export const SelectedLocation = z
  .string()
  .refine((val) => flattenedLocations().includes(val));

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
export type SelectedLocationType = z.infer<typeof SelectedLocation>;
