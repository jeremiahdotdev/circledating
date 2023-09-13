import { CircleSchema } from "./Circle";
import { GenderSchema } from "./Gender";
import { z } from "zod";

export const UserPreferencesSchema = z.object({
  userId: z.string(),
  minAge: z.number(),
  maxAge: z.number(),
  sex: GenderSchema.optional(),
  selectedCircles: z.array(CircleSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type UserPreferencesType = z.infer<typeof UserPreferencesSchema>;
