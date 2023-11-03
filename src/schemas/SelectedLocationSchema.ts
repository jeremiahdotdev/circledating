import { ButtonRowOptionType } from "@/components/ui/button-row";
import { IconButtonVariant } from "./Button";
import { YesNoOrUnknown } from "@prisma/client";
import { flattenedLocations } from "@/globals/location";
import { z } from "zod";

export const SelectedLocationSchema = z.object({
  state: z.string().optional().nullable(),
  continent: z.string(),
  country: z.string(),
});

export const LocationSchema = z.object({
  ...SelectedLocationSchema.shape,
  id: z.string(),
});

export const SelectedLocation = z
  .string()
  .refine((val) => flattenedLocations().includes(val));

export type SelectedLocationSchemaType = z.infer<typeof SelectedLocationSchema>;
export type LocationSchemaType = z.infer<typeof LocationSchema>;
export type SelectedLocationType = z.infer<typeof SelectedLocation>;

export const WillingToRelocateButtonOptions: ButtonRowOptionType[] = [
  { value: YesNoOrUnknown.YES, variant: IconButtonVariant.PLANE },
  { value: YesNoOrUnknown.NO, variant: IconButtonVariant.PLANE_SLASH },
];
