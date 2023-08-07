import { ProfileSchema } from "./Profile";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  profile: ProfileSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userProfileUsername: z.string(),
});

export const CreationUserSchema = z.object({
  ...UserSchema.shape,
  password: z.string().min(8),
  id: z.string().uuid().optional(),
  userProfileUsername: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type CreationUserSchemaType = z.infer<typeof CreationUserSchema>;
