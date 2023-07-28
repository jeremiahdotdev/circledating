import { z } from "zod";

export const HeightSchema = z
  .object({
    feet: z.number().min(0).max(7),
    inches: z.number().min(0).max(11),
  })
  .or(z.object({ centimeters: z.number().min(0).max(300) }));

export type HeightSchemaType = z.infer<typeof HeightSchema>;
