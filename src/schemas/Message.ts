import { z } from "zod";

export const MutateMessageSchema = z.object({
  id: z.string().optional(),
  conversationId: z.string().nullable(),
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string().min(1).max(2000),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
});

export const MessageUserSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export const ReadMessageSchema = z.object({
  id: z.string().optional(),
  conversationId: z.string(),
  author: MessageUserSchema,
  recipient: MessageUserSchema,
  content: z.string().min(1).max(2000),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export const AccessMessagesSchema = z.object({
  authorUsername: z.string(),
  recipientUsername: z.string(),
});

export type ReadMessageSchemaType = z.infer<typeof ReadMessageSchema>;
export type AccessMessagesSchemaType = z.infer<typeof AccessMessagesSchema>;
export type MessageUserSchemaType = z.infer<typeof MessageUserSchema>;
export type MutateMessageSchemaType = z.infer<typeof MutateMessageSchema>;
