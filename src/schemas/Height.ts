import { z } from "zod";

export enum HeightUnit {
  CMS = "cms",
  FEET = "feet",
  INCHES = "inches",
}

export const HeightUnitSchemaType = z.nativeEnum(HeightUnit);

export const HeightSchema = z.object({
  value: z
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
    ),
  unit: z.string(),
});

export type HeightSchemaType = z.infer<typeof HeightSchema>;
