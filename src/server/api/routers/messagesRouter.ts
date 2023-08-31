import { MessageSchema, ReadMessagesSchema } from "@/schemas/Message";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messagesRouter = createTRPCRouter({
  create: publicProcedure.input(MessageSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.userMessage.create({
      data: input,
    });
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
