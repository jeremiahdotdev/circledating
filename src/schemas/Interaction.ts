import { z } from "zod";

export const InteractionSchema = z.object({
  id: z.string().uuid(),
  initiatedUser: z.string(),
  affectedUser: z.string(),
  isLiked: z.boolean(),
  isBlocked: z.boolean(),
});

export type InteractionSchemaType = z.infer<typeof InteractionSchema>;
