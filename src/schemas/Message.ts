import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().uuid(),
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
