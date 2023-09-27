import { ParseMessage, PrismaMessage, ReadMessageSchema } from "./Message";
import { z } from "zod";

export const MutateConversationSchema = z.object({
  id: z.string().optional(),
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  ),
  messages: z.array(ReadMessageSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const ReadConversationSchema = z.object({
  id: z.string(),
  users: z.array(
    z.object({
      userId: z.string(),
      username: z.string(),
    })
  ),
  messages: z.array(ReadMessageSchema),
});

export type ReadConversationSchemaType = z.infer<typeof ReadConversationSchema>;
export type MutateConversationSchemaType = z.infer<
  typeof MutateConversationSchema
>;

export type PrismaConversationType = {
  id: string;
  users: {
    userId: string;
    user: {
      username: string;
    };
  }[];
  messages: PrismaMessage[];
};

export function ParseConversation(
  conversation: PrismaConversationType
): ReadConversationSchemaType {
  return {
    ...conversation,
    users: conversation.users.map((u) => ({
      userId: u.userId,
      username: u.user.username,
    })),
    messages: conversation.messages.map(ParseMessage),
  };
}
