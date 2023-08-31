import {
  ConversationParser,
  ReadConversationsSchema,
} from "@/schemas/Conversation";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const conversationRouter = createTRPCRouter({
  read: publicProcedure
    .input(ReadConversationsSchema)
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: input.userId,
            },
          },
        },
        select: {
          id: true,
          users: {
            select: {
              userId: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return { success: true, data: data.map(ConversationParser) };
    }),
});
