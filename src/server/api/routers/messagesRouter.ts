import { MessageSchema, ReadMessagesSchema } from "@/schemas/Message";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messagesRouter = createTRPCRouter({
  create: publicProcedure
    .input(MessageSchema)
    .mutation(async ({ input, ctx }) => {
      const created = await ctx.prisma.userMessage.create({
        data: {
          authorUsername: input.authorUsername,
          recipientUsername: input.recipientUsername,
          content: input.content,
        },
        select: {
          author: {
            select: {
              id: true,
            },
          },
          recipient: {
            select: {
              id: true,
            },
          },
          conversationId: true,
        },
      });

      if (input.conversationId === "") {
        const data = await ctx.prisma.conversation.create({
          data: {
            id: created.conversationId ?? undefined,
            users: {
              create: [
                {
                  userId: created.author.id,
                },
                {
                  userId: created.recipient.id,
                },
              ],
            },
          },
        });
        return data;
      }
    }),
  read: publicProcedure
    .input(ReadMessagesSchema)
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.userMessage.findMany({
        where: {
          authorUsername: input.authorUsername,
          recipientUsername: input.recipientUsername,
        },
      });
      return data;
    }),
});
