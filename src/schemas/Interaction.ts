import { z } from "zod";

export const InteractionSchema = z.object({
  id: z.string().uuid().optional(),
  initiatedUserId: z.string().optional(),
  affectedUserId: z.string(),
  isLiked: z.boolean(),
  isBlocked: z.boolean(),
});

export const createInteractionSchema = z.object({
  interaction: InteractionSchema,
});

export type InteractionSchemaType = z.infer<typeof InteractionSchema>;
