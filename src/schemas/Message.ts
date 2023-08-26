import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().uuid(),
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
