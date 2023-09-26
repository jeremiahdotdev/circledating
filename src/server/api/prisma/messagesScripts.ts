import {
  AccessMessagesSchemaType,
  MutateMessageSchemaType,
} from "@/schemas/Message";
import { PrismaParameter } from "../types";

export const messagesScripts = {
  query: {
    read: async ({ input, ctx }: PrismaParameter<AccessMessagesSchemaType>) => {
      const data = await ctx.prisma.userMessage.findMany({
        where: {
          authorUsername: input.authorUsername,
          recipientUsername: input.recipientUsername,
        },
      });
      return data;
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
