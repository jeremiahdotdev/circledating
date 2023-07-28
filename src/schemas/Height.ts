import { z } from "zod";

export const HeightSchema = z
  .object({
    feet: z
      .number()
      .min(0, "The height must be greater than 0 feet.")
      .max(7, "The height cannot be greater than 7 feet."),
    inches: z.number().min(0).max(11),
  })
  .or(
    z.object({
      centimeters: z
        .number()
        .min(0, "The height has to be greater than 0 centimeters")
        .max(300, "The height has to be less than 300 centimeters"),
    })
  );

export type HeightSchemaType = z.infer<typeof HeightSchema>;
