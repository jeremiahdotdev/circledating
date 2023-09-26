import { ConversationParser } from "@/schemas/Conversation";
import { Prisma } from "@prisma/client";
import { PrismaParameter } from "../types";

// Helpers
export const messagesDescending = {
  orderBy: {
    createdAt: "desc" as Prisma.SortOrder,
  },
};
export const messagesUsers = {
  select: {
    userId: true,
    user: {
      select: {
        username: true,
      },
    },
  },
};

// Scripts
export const conversationScripts = {
  query: {
    read: async ({ input, ctx }: PrismaParameter<string>) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: input,
            },
          },
          deletedAt: null,
        },
        select: {
          id: true,
          users: messagesUsers,
          messages: messagesDescending,
        },
      });

      return { success: true, data: data.map(ConversationParser) };
    },
    readDeleted: async ({ input, ctx }: PrismaParameter<string>) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: input,
            },
          },
          deletedAt: { not: null },
        },
        select: {
          id: true,
          users: messagesUsers,
          messages: messagesDescending,
        },
      });

      return data.map(ConversationParser);
    },
  },
  mutate: {
    softDelete: async ({ input, ctx }: PrismaParameter<string>) => {
      return await ctx.prisma.conversation.update({
        data: {
          deletedAt: new Date(),
        },
        where: {
          id: input,
        },
      });
    },
    unDelete: async ({ input, ctx }: PrismaParameter<string>) => {
      return ctx.prisma.conversation.update({
        data: {
          deletedAt: null,
        },
        where: {
          id: input,
        },
      });
    },
  },
};
