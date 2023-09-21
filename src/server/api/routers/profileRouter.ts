import {
  CreateProfileSchema,
  ProfileSchema,
  ProfileSchemaType,
  UpdateImageSchema,
  UpdateProfileSchema,
  isProfile,
} from "@/schemas/Profile";
import {
  UserPreferencesSchema,
  UserPreferencesSchemaType,
} from "@/schemas/UserPreferences";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const handlePreferences = (preferences: UserPreferencesSchemaType) => {
  const filters = [];
  if (preferences.consumables.length)
    filters.push({
      consumables: {
        in: preferences.consumables,
      },
    });
  if (preferences.drinking.length)
    filters.push({
      drinking: {
        in: preferences.drinking,
      },
    });
  if (preferences.politicalBeliefs.length)
    filters.push({
      politicalBeliefs: {
        in: preferences.politicalBeliefs,
      },
    });
  if (preferences.religion.length)
    filters.push({
      religion: {
        in: preferences.religion,
      },
    });
  if (preferences.searchContinents.length)
    filters.push({
      location: {
        continent: {
          in: preferences.searchContinents,
        },
      },
    });
  if (preferences.searchCountries.length)
    filters.push({
      location: {
        country: {
          in: preferences.searchCountries,
        },
      },
    });
  if (preferences.searchStates.length)
    filters.push({
      location: {
        state: {
          in: preferences.searchStates,
        },
      },
    });
  if (preferences.income.length)
    filters.push({
      income: {
        in: preferences.income,
      },
    });
  return filters;
};

export const profileRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.create({
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
          image: "",
          links: {},
          interactions: {},
          affections: {},
        },
      });
      return result;
    }),
  update: publicProcedure
    .input(UpdateProfileSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.update({
        where: {
          userId: input.userId,
        },
        data: {
          bio: input.bio,
          weight: input.weight,
          height: input.height,
          income: input.income,
          drinking: input.drinking,
          consumables: input.consumables,
          children: input.children,
          purity: input.purity,
          religion: input.religion,
          politicalBeliefs: input.politicalBeliefs,
          levelOfEducation: input.levelOfEducation,
          activity: input.activity,
          willingToRelocate: input.willingToRelocate,
          ethnicity: input.ethnicity,
          maritalStatus: input.maritalStatus,
          links: input.links ?? undefined,
          location: {
            connectOrCreate: {
              create: { ...input.location },
              where: { id: input.location.id },
            },
          },
        },
      });
      return result;
    }),
  updateImage: publicProcedure
    .input(UpdateImageSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.update({
        where: {
          userId: input.userId,
        },
        data: {
          image: input.image,
        },
      });
      return result;
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
          AND: handlePreferences(input.currentUserPreferences),
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
          circles: true,
        },
      });
      const profiles: ProfileSchemaType[] = [];
      result.forEach((r) => {
        const profile = {
          ...r,
          links: [],
          interactions: [],
          circles: r.circles.map((c) => ({ id: c.circleId })),
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
          circles: {
            include: {
              Circle: true,
            },
          },
        },
      });

      const profile = {
        ...result,
        interactions: [],
        circles: result?.circles.map((c) => c.Circle),
      };

      return profile as ProfileSchemaType;
    }),
  isUsernameUnique: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          username: {
            equals: input.username,
          },
        },
        select: {
          userId: true,
        },
      });
      return !result.length;
    }),
});
