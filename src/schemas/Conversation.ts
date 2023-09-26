import { MessageSchema } from "./Message";
import { z } from "zod";

export const ConversationSchema = z.object({
  id: z.string().optional(),
  users: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
    })
  ),
  messages: z.array(MessageSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const ConversationResultSchema = z.object({
  id: z.string(),
  users: z.array(
    z.object({
      userId: z.string(),
      user: z.object({
        username: z.string(),
      }),
    })
  ),
  messages: z.array(MessageSchema),
});

export type ConversationSchemaType = z.infer<typeof ConversationSchema>;
export type ConversationResultSchemaType = z.infer<
  typeof ConversationResultSchema
>;

export const ConversationParser = (res: ConversationResultSchemaType) =>
  ({
    id: res.id,
    users: res.users.map((user) => ({
      id: user.userId,
      username: user.user.username,
    })),
    messages: res.messages,
  }) as ConversationSchemaType;
