import {
  AccessMessagesSchemaType,
  MutateMessageSchemaType,
  ParseMessage,
  ReadMessageSchemaType,
} from "@/schemas/Message";
import { PrismaParameter } from "../types";

export const messagesScripts = {
  query: {
    read: async ({ input, ctx }: PrismaParameter<AccessMessagesSchemaType>) => {
      const result = await ctx.prisma.userMessage.findMany({
        where: {
          authorUsername: input.authorUsername,
          recipientUsername: input.recipientUsername,
        },
      });

      const messages: ReadMessageSchemaType[] = [];
      result.map((r) => {
        const message = ParseMessage(r);
        if (message) messages.push(message);
      });
      return messages;
    },
  },
  mutate: {
    create: async ({
      input,
      ctx,
    }: PrismaParameter<MutateMessageSchemaType>) => {
      return ctx.prisma.userMessage.create({
        data: input,
      });
    },
  },
};
