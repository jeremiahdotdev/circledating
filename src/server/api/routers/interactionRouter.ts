import { createInteractionSchema } from "@/schemas/Interaction";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const interactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInteractionSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userInteraction.create({
        data: input.interaction,
      });
    }),
});
