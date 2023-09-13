import {
  ConversationParser,
  ReadConversationsSchema,
} from "@/schemas/Conversation";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

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
          deletedAt: null,
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
  readDeleted: publicProcedure
    .input(ReadConversationsSchema)
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: input.userId,
            },
          },
          deletedAt: { not: null },
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
  softDelete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.conversation.update({
        data: {
          deletedAt: new Date(),
        },
        where: input,
      });
    }),
  unDelete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.conversation.update({
        data: {
          deletedAt: null,
        },
        where: input,
      });
    }),
});
