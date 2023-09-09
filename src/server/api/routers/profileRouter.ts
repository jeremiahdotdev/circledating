import {
  CreateProfileSchema,
  ProfileSchema,
  ProfileSchemaType,
  isProfile,
} from "@/schemas/Profile";
import { UserPreferencesSchema } from "@/schemas/UserPreferences";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getSecureLinks } from "@/schemas/Link";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProfileSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userProfile.create({
        data: {
          ...input,
          location: {
            create: {
              ...input.location,
            },
          },
          circles: {
            connect: input.circles,
          },
          links: {},
          interactions: {},
        },
      });
    }),
  readMany: publicProcedure
    .input(
      z.object({
        currentUserProfile: ProfileSchema,
        currentUserPreferences: UserPreferencesSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          // General filters - Never return the same user/same sex, and check age.
          NOT: {
            userId: input.currentUserProfile.userId,
          },
          sex: input.currentUserPreferences.sex,
          birthDate: {
            gte: new Date(
              Date.now() -
                input.currentUserPreferences.ageRange[1] *
                  1000 *
                  60 *
                  60 *
                  24 *
                  365
            ),
            lte: new Date(
              Date.now() -
                input.currentUserPreferences.ageRange[0] *
                  1000 *
                  60 *
                  60 *
                  24 *
                  365
            ),
          },
          // Optional filters - If supplied, check against filter.
          AND: [
            input.currentUserPreferences.consumables.length
              ? {
                  consumables: {
                    in: input.currentUserPreferences.consumables,
                  },
                }
              : {},
            input.currentUserPreferences.drinking.length
              ? {
                  drinking: {
                    in: input.currentUserPreferences.drinking,
                  },
                }
              : {},
            input.currentUserPreferences.politicalBeliefs.length
              ? {
                  politicalBeliefs: {
                    in: input.currentUserPreferences.politicalBeliefs,
                  },
                }
              : {},
            input.currentUserPreferences.religion.length
              ? {
                  religion: {
                    in: input.currentUserPreferences.religion,
                  },
                }
              : {},
            input.currentUserPreferences.searchContinents.length
              ? {
                  location: {
                    continent: {
                      in: input.currentUserPreferences.searchContinents,
                    },
                  },
                }
              : {},
            input.currentUserPreferences.searchCountries.length
              ? {
                  location: {
                    country: {
                      in: input.currentUserPreferences.searchCountries,
                    },
                  },
                }
              : {},
            input.currentUserPreferences.searchStates.length
              ? {
                  location: {
                    state: {
                      in: input.currentUserPreferences.searchStates,
                    },
                  },
                }
              : {},
          ],
          affections: {
            none: {
              initiatedUserId: input.currentUserProfile.userId,
            },
          },
          circles: {
            some: {
              circleId: {
                in: input.currentUserPreferences?.selectedCircles?.map(
                  (circle) => circle.id ?? "0"
                ),
              },
            },
          },
        },
        include: {
          location: true,
        },
      });
      const profiles: ProfileSchemaType[] = [];
      result.forEach((r) => {
        const profile = {
          ...r,
          links: [],
          interactions: [],
          circles: [],
        };
        if (isProfile(profile)) profiles.push(profile as ProfileSchemaType);
      });
      return profiles;
    }),
  read: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.findUnique({
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

      const profile = {
        ...result,
        links: getSecureLinks(result?.links),
        interactions: [],
        circles: result?.circles.map((c) => c.Circle),
      };

      return profile as ProfileSchemaType;
    }),
});
