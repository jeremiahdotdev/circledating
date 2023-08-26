import { CircleSchema } from "@/schemas/Circle";
import { ProfileSchema } from "@/schemas/Profile";
import { UserProfile } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

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
  read: publicProcedure
    .input(
      z.object({
        currentUserProfile: ProfileSchema,
        circles: z.array(CircleSchema),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.userProfile.findMany({
        where: {
          NOT: {
            username: input.currentUserProfile.username,
          },
        },
        include: {
          location: {},
          circles: {
            where: {
              circleName: {
                in: input.circles.map((circle) => circle.name),
              },
            },
            include: {
              Circle: {
                include: {
                  religionRestriction: {},
                  sexRestriction: {},
                  incomeRestriction: {},
                  purityRestriction: {},
                  activityRestriction: {},
                  childrenRestriction: {},
                  drinkingRestriction: {},
                  continentRestriction: {},
                  ethnicityRestriction: {},
                  consumablesRestriction: {},
                  maritalStatusRestriction: {},
                  levelOfEducationRestriction: {},
                  politicalBeliefsRestriction: {},
                  willingToRelocateRestriction: {},
                  onlyLookingForTraditionalHouseholdRestriction: {},
                },
              },
            },
          },
        },
      });
    }),
});
