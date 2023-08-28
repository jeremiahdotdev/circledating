import { ContinentSchema } from "./Continent";
import { z } from "zod";

export const SelectedLocationSchema = z.object({
  continent: ContinentSchema,
  country: z.string(),
  state: z.string(),
});

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
