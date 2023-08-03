import { ProfileSchema } from "@/schemas/Profile";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  create: publicProcedure.input(ProfileSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.userProfile.create({
      data: {
        ...input,
        location: {
          create: {
            ...input.location,
          },
        },
      },
    });
  }),
});
