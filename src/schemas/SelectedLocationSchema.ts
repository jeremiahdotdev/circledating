import { z } from "zod";

export const SelectedLocationSchema = z.object({
  continent: z.string(),
  country: z.string(),
  state: z.string(),
});

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
