import { InteractionSchemaType } from "@/schemas/Interaction";
import { PrismaParameter } from "../types";

export const interactionScripts = {
  query: {},
  mutate: {
    create: async ({ input, ctx }: PrismaParameter<InteractionSchemaType>) => {
      let returnValue;
      if (ctx.session?.id) {
        returnValue = await ctx.prisma.userInteraction.create({
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
          returnValue = data;
        }
      }
      return returnValue;
    },
  },
};
