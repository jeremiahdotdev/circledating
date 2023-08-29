import { MessageSchema } from "@/schemas/Message";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const readMessagesSchema = z.object({
  authorUsername: z.string(),
  recipientUsername: z.string(),
});
export const messagesRouter = createTRPCRouter({
  create: publicProcedure.input(MessageSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.userMessage.create({
      data: input,
    });
  }),
  read: publicProcedure.input(readMessagesSchema).query(({ input, ctx }) => {
    return ctx.prisma.userMessage.findMany({
      where: {
        OR: [
          {
            authorUsername: input.authorUsername,
            recipientUsername: input.recipientUsername,
          },
          {
            authorUsername: input.recipientUsername,
            recipientUsername: input.authorUsername,
          },
        ],
      },
    });
  }),
});
