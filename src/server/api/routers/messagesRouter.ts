import { AccessMessagesSchema, MutateMessageSchema } from "@/schemas/Message";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { messagesScripts } from "../prisma/messagesScripts";

export const messagesRouter = createTRPCRouter({
  read: publicProcedure
    .input(AccessMessagesSchema)
    .query(messagesScripts.query.read),
  create: publicProcedure
    .input(MutateMessageSchema)
    .mutation(messagesScripts.mutate.create),
});
