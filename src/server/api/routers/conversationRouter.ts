import { conversationScripts } from "../prisma/conversationScripts";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const conversationRouter = createTRPCRouter({
  read: publicProcedure.query(conversationScripts.query.read),
  readDeleted: publicProcedure.query(conversationScripts.query.readDeleted),
  getNotifications: publicProcedure.query(
    conversationScripts.query.getNotifications
  ),
  markAllAsRead: publicProcedure
    .input(z.string())
    .mutation(conversationScripts.mutate.markAllAsRead),
  softDelete: publicProcedure
    .input(z.string())
    .mutation(conversationScripts.mutate.softDelete),
  unDelete: publicProcedure
    .input(z.string())
    .mutation(conversationScripts.mutate.unDelete),
});
