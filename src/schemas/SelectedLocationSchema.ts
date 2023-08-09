import { z } from "zod";

export const SelectedLocationSchema = z.object({
  country: z.string(),
  state: z.string(),
});

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
