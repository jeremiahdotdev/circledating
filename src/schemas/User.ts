import { InteractionSchema } from "./Interaction";
import { ProfileSchema } from "./Profile";
import { UserPreferencesSchema } from "./UserPreferences";
import { z } from "zod";

export const UserSchema = z.object({
  // TODO: enforce uuid
  id: z.string(),
  email: z.string().email(),
  profile: ProfileSchema,
  preferences: UserPreferencesSchema,
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
