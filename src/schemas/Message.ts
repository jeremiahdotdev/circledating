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
  authorUsername: z.string(),
  recipientUsername: z.string(),
  content: z.string().min(1).max(2000),
  isRead: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AccessMessagesSchema = z.object({
  authorUsername: z.string(),
  recipientUsername: z.string(),
});

export type ReadMessageSchemaType = z.infer<typeof ReadMessageSchema>;
export type AccessMessagesSchemaType = z.infer<typeof AccessMessagesSchema>;
export type MessageUserSchemaType = z.infer<typeof MessageUserSchema>;
export type MutateMessageSchemaType = z.infer<typeof MutateMessageSchema>;

export type PrismaMessage = {
  id: string;
  conversationId: string | null;
  authorUsername: string;
  recipientUsername: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export function ParseMessage(message: PrismaMessage): ReadMessageSchemaType {
  return {
    ...message,
    conversationId: message.conversationId ?? "",
    createdAt: message.createdAt.toLocaleString(),
    updatedAt:
      message.updatedAt?.toLocaleString() ?? message.createdAt.toLocaleString(),
    isRead: true,
  };
}
