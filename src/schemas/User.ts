import { ProfileSchema } from "./Profile";
import { UserPreferencesSchema } from "./UserPreferences";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  profile: ProfileSchema,
  Preferences: UserPreferencesSchema,
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
