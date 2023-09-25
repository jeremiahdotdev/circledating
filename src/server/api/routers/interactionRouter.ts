import { InteractionSchema } from "@/schemas/Interaction";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { systemMessages } from "@/globals/systemMessages";
import { trpcResult } from "@/utils/trpcResult";

export const interactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(InteractionSchema)
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.id) return trpcResult(systemMessages.NO_PROFILE);
      await ctx.prisma.userInteraction.create({
        data: { ...input, initiatedUserId: ctx.session.id },
      });
      const isMatch = await ctx.prisma.userInteraction.findFirst({
        where: {
          initiatedUserId: input.affectedUserId,
          affectedUserId: ctx.session.id,
          isLiked: true,
          isBlocked: false,
        },
      });
      if (isMatch) {
        const data = await ctx.prisma.conversation.create({
          data: {
            users: {
              create: [
                {
                  userId: ctx.session.id,
                },
                {
                  userId: input.affectedUserId,
                },
              ],
            },
          },
        });
        return data;
      }
    }),
});
