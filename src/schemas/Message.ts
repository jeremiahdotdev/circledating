import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string().min(1).max(2000),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
