import {
  ProfileSchema,
  ReadProfileSchema,
  ReadProfilesSchema,
} from "@/schemas/Profile";
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
        // TODO: Make sure circles save correctly once we add a "circles" multiselector to the New-Profile section.
        circles: {},
      },
    });
  }),
  readMany: publicProcedure
    .input(ReadProfilesSchema)
    .query(({ input, ctx }) => {
      return ctx.prisma.userProfile.findMany({
        where: {
          NOT: {
            userId: input.currentUserProfile.userId,
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
          circles: {
            some: {
              circleId: {
                in: input.currentUserPreferences.selectedCircles.map(
                  (circle) => circle.id ?? "0"
                ),
              },
            },
          },
          userAffections: {
            none: {
              initiatedUserId: input.currentUserProfile.userId,
            },
          },
        },
        include: {
          location: true,
          circles: true,
          //   circles: {
          //     where: {
          //       circleName: {
          //         in: input.currentUserPreferences.selectedCircles.map(
          //           (circle) => circle.name
          //         ),
          //       },
          //     },
          //     // These fields need only be considered when a user is creating or joining a circle.
          //     include: {
          //       Circle: {
          //         include: {
          //           religionRestriction: {},
          //           sexRestriction: {},
          //           incomeRestriction: {},
          //           purityRestriction: {},
          //           activityRestriction: {},
          //           childrenRestriction: {},
          //           drinkingRestriction: {},
          //           continentRestriction: {},
          //           ethnicityRestriction: {},
          //           consumablesRestriction: {},
          //           maritalStatusRestriction: {},
          //           levelOfEducationRestriction: {},
          //           politicalBeliefsRestriction: {},
          //           willingToRelocateRestriction: {},
          //           onlyLookingForTraditionalHouseholdRestriction: {},
          //         },
          //       },
          //     },
          //   },
        },
      });
    }),
  read: publicProcedure.input(ReadProfileSchema).query(({ input, ctx }) => {
    return ctx.prisma.userProfile.findUnique({
      where: {
        username: input.username,
      },
      include: {
        location: true,
        links: true,
        circles: {
          include: {
            Circle: true,
          },
        },
      },
    });
  }),
});
