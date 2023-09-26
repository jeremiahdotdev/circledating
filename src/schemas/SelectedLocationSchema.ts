import { flattenedLocations } from "@/globals/location";
import { z } from "zod";

export const SelectedLocationPartial = {
  state: z.string().optional(),
  continent: z.string(),
  country: z.string(),
};

export const SelectedLocationSchema = z.object(SelectedLocationPartial);
export const LocationSchema = z.object({
  ...SelectedLocationPartial,
  id: z.string(),
});

export const SelectedLocation = z
  .string()
  .refine((val) => flattenedLocations().includes(val));

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
export type LocationSchemaType = z.infer<typeof LocationSchema>;
export type SelectedLocationType = z.infer<typeof SelectedLocation>;
