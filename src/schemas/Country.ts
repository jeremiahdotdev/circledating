import { z } from "zod";

export const CountrySchema = z.object({
  country: z.string(),
  states: z.array(z.string()),
});

export type CountrySchemaType = z.infer<typeof CountrySchema>;
