import { createInteractionSchema } from "@/schemas/Interaction";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const interactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInteractionSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.userInteraction.create({
        data: input.interaction,
      });
      if (input.isMatch) {
        const data = await ctx.prisma.conversation.create({
          data: {
            users: {
              create: [
                {
                  userId: input.interaction.initiatedUserId,
                },
                {
                  userId: input.interaction.affectedUserId,
                },
              ],
            },
          },
        });
        return data;
      }
    }),
});
