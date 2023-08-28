import { ProfileSchema } from "@/schemas/Profile";
import { UserPreferencesSchema } from "@/schemas/UserPreferences";
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
        currentUserPreferences: UserPreferencesSchema,
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.userProfile.findMany({
        where: {
          NOT: {
            username: input.currentUserProfile.username,
          },
          birthDate: {
            gte: new Date(
              Date.now() -
                input.currentUserPreferences.maxAge * 1000 * 60 * 60 * 24 * 365
            ),
            lte: new Date(
              Date.now() -
                input.currentUserPreferences.minAge * 1000 * 60 * 60 * 24 * 365
            ),
          },
          sex: input.currentUserPreferences.sex,
        },
        include: {
          location: {},
          circles: {
            where: {
              circleName: {
                in: input.currentUserPreferences.selectedCircles.map(
                  (circle) => circle.name
                ),
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
