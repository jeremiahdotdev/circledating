import { ParseConversation } from "@/schemas/Conversation";
import { Prisma } from "@prisma/client";
import { PrismaContext, PrismaParameter } from "../types";

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
    getNotifications: async ({ ctx }: PrismaContext) => {
      // Native Prisma does not support aggregates with "DISTINCT"
      const response = await ctx.prisma.$queryRaw<{
        count: number;
      }>(Prisma.sql`
		SELECT
			COUNT(DISTINCT "conversationId") as "count"
		FROM "UserMessage"
		WHERE "recipientUsername" == ${ctx.session?.user?.name}
	`);
      return response.count ?? 0;
    },
    read: async ({ ctx }: PrismaContext) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: ctx.session?.id,
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

      return data.map(ParseConversation);
    },
    readDeleted: async ({ ctx }: PrismaContext) => {
      const data = await ctx.prisma.conversation.findMany({
        where: {
          users: {
            some: {
              userId: ctx.session?.id,
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

      return data.map(ParseConversation);
    },
  },
  mutate: {
    markAllAsRead: async ({ input, ctx }: PrismaParameter<string>) => {
      return await ctx.prisma.userMessage.updateMany({
        data: {
          isRead: true,
        },
        where: {
          conversationId: input,
        },
      });
    },
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
