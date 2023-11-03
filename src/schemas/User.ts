import { InteractionSchema } from "./Interaction";
import { ReadProfileSchema } from "./Profile";
import { ReadUserPreferencesSchema } from "./UserPreferences";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  isAdmin: z.boolean(),
  profile: ReadProfileSchema,
  preferences: ReadUserPreferencesSchema,
  interactions: z.array(InteractionSchema).nullable(),
  affections: z.array(InteractionSchema).nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  username: z.string(),
});

export const CreationUserSchema = z.object({
  ...UserSchema.shape,
  password: z.string().min(8),
  id: z.string().uuid().optional(),
  username: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type CreationUserSchemaType = z.infer<typeof CreationUserSchema>;
