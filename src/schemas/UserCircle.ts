import { UserTypeSchema } from "./UserType";
import { z } from "zod";

export const UserCircleSchema = z.object({
  userId: z.string(),
  circleId: z.string(),
  userTitle: UserTypeSchema,
  isSelected: z.boolean(),
});

export type UserCircleSchemaType = z.infer<typeof UserCircleSchema>;
