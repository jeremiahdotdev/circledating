import { conversationScripts } from "../prisma/conversationScripts";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const conversationRouter = createTRPCRouter({
  read: publicProcedure.input(z.string()).query(conversationScripts.query.read),
  readDeleted: publicProcedure
    .input(z.string())
    .query(conversationScripts.query.readDeleted),
  softDelete: publicProcedure
    .input(z.string())
    .mutation(conversationScripts.mutate.softDelete),
  unDelete: publicProcedure
    .input(z.string())
    .mutation(conversationScripts.mutate.unDelete),
});
