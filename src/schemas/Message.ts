import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string().optional(),
  conversationId: z.string().nullable(),
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string().min(1).max(2000),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
});

export const ReadMessagesSchema = z.object({
  authorUsername: z.string(),
  recipientUsername: z.string(),
});

export const MessageUserSchema = z.object({
  id: z.string(),
  username: z.string(),
});
export const MessageResultSchema = z.object({
  id: z.string().optional(),
  conversationId: z.string(),
  author: MessageUserSchema,
  recipient: MessageUserSchema,
  content: z.string().min(1).max(2000),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
export type ReadMessagesSchemaType = z.infer<typeof ReadMessagesSchema>;
export type MessageUserSchemaType = z.infer<typeof MessageUserSchema>;
export type MessageResultSchemaType = z.infer<typeof MessageResultSchema>;

export const MessageParser = (res: MessageResultSchemaType) =>
  ({
    id: res.id,
    conversationId: res.conversationId,
    content: res.content,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
    authorUserId: res.author.id,
    recipientUserId: res.recipient.id,
    authorUsername: res.author.username,
    recipientUsername: res.recipient.username,
  }) as MessageSchemaType;
