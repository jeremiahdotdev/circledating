import { Children } from "@prisma/client";
import {
  MutateProfileSchemaType,
  ParseProfile,
  ParseProfiles,
  ReadProfileSchemaType,
} from "@/schemas/Profile";
import { PrismaContext, PrismaParameter } from "../types";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { UpdateImageSchemaType } from "@/schemas/Profile";
import { getCurrentUserFromContext } from "@/helpers/getCurrentUserFromContext";

export const handlePreferences = (
  preferences?: ReadUserPreferencesSchemaType,
  circles?: ReadCircleSchemaType[]
) => {
  const filters = [];
  if (preferences && circles?.some((circle) => circle.isSelected)) {
    filters.push({
      circles: {
        some: {
          circleId: {
            in: circles
              .filter((circle) => !!circle.isSelected)
              .map((circle) => circle.id ?? "0"),
          },
        },
      },
    });
  } else {
    return [];
  }
  if (preferences.sex)
    filters.push({
      sex: preferences.sex,
    });
  if (preferences.ageRange)
    filters.push({
      birthDate: {
        gte: new Date(
          Date.now() - preferences.ageRange[1] * 1000 * 60 * 60 * 24 * 365
        ),
        lte: new Date(
          Date.now() - preferences.ageRange[0] * 1000 * 60 * 60 * 24 * 365
        ),
      },
    });
  if (preferences?.consumables?.length)
    filters.push({
      consumables: {
        in: preferences.consumables,
      },
    });
  if (preferences?.drinking?.length)
    filters.push({
      drinking: {
        in: preferences.drinking,
      },
    });
  if (preferences?.politicalBeliefs?.length)
    filters.push({
      politicalBeliefs: {
        in: preferences.politicalBeliefs,
      },
    });
  if (preferences.religion?.length)
    filters.push({
      religion: {
        in: preferences.religion,
      },
    });
  if (preferences?.searchContinents?.length)
    filters.push({
      location: {
        continent: {
          in: preferences?.searchContinents,
        },
      },
    });
  if (preferences?.searchCountries?.length)
    filters.push({
      location: {
        country: {
          in: preferences.searchCountries,
        },
      },
    });
  if (preferences?.searchStates?.length)
    filters.push({
      location: {
        state: {
          in: preferences.searchStates,
        },
      },
    });
  if (preferences?.income?.length)
    filters.push({
      income: {
        in: preferences.income,
      },
    });
  return filters;
};

export const IsProfilePerfectMatch = (
  currentUser: ReadProfileSchemaType,
  profile: ReadProfileSchemaType
) => {
  if (profile.religion !== currentUser.religion) return false;
  if (profile.drinking !== currentUser.drinking) return false;
  if (profile.activity !== currentUser.activity) return false;
  if (profile.children !== currentUser.children) return false;
  if (profile.income !== currentUser.income) return false;
  if (profile.maritalStatus !== currentUser.maritalStatus) return false;
  if (profile.purity !== currentUser.purity) return false;
  if (profile.politicalBeliefs !== currentUser.politicalBeliefs) return false;

  return true;
};

export const profileScripts = {
  query: {
    readProfiles: async ({ ctx }: PrismaContext) => {
      const { profile, preferences } = await getCurrentUserFromContext(ctx);
      if (!profile) return [];
      const preferenceFilters = handlePreferences(preferences, profile.circles);
      if (!preferenceFilters.length) return [];
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          AND: preferenceFilters,
          affections: {
            none: {
              initiatedUserId: profile.userId,
            },
          },
          NOT: { sex: profile.sex },
        },
        include: {
          location: true,
          interactions: {
            select: {
              affectedUserId: true,
            },
            where: {
              affectedUserId: profile.userId,
              isLiked: true,
            },
          },
          user: {
            select: {
              circles: {
                select: {
                  isSelected: true,
                  circle: true,
                },
              },
            },
          },
        },
        take: 10,
      });

      return ParseProfiles(result);
    },
    readProfilesByNumber: async ({ input, ctx }: PrismaParameter<number>) => {
      const { profile, preferences } = await getCurrentUserFromContext(ctx);
      if (!profile) return [];
      const preferenceFilters = handlePreferences(preferences, profile.circles);
      if (!preferenceFilters.length) return [];
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          AND: preferenceFilters,
          affections: {
            none: {
              initiatedUserId: profile.userId,
            },
          },
          NOT: { sex: profile.sex },
        },
        include: {
          location: true,
          user: {
            select: {
              circles: {
                select: {
                  circle: true,
                },
              },
            },
          },
          interactions: {
            select: {
              affectedUserId: true,
            },
            where: {
              affectedUserId: profile.userId,
              isLiked: true,
            },
          },
        },
        take: input,
      });

      return ParseProfiles(result);
    },
    read: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.userProfile.findUnique({
        where: {
          username: input,
        },
        include: {
          location: true,
          user: {
            select: {
              circles: {
                select: {
                  isSelected: true,
                  circle: true,
                },
              },
            },
          },
        },
      });

      return ParseProfile(result);
    },
    readCurrent: async ({ ctx }: PrismaContext) => {
      const result = await ctx.prisma.userProfile.findUnique({
        where: {
          userId: ctx.session?.id,
        },
        include: {
          location: true,
          user: {
            select: {
              circles: {
                select: {
                  isSelected: true,
                  circle: true,
                },
              },
            },
          },
        },
      });
      return ParseProfile(result);
    },
    isUsernameUnique: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          username: {
            equals: input,
          },
        },
        select: {
          userId: true,
        },
      });
      return !result.length;
    },
  },
  mutate: {
    create: async ({
      input,
      ctx,
    }: PrismaParameter<MutateProfileSchemaType>) => {
      const children =
        input.hasChildren && input.wantsChildren
          ? Children.HAS_AND_WANTS
          : !input.hasChildren && input.wantsChildren
          ? Children.HAS_NOT_AND_DOES_WANT
          : input.hasChildren && !input.wantsChildren
          ? Children.HAS_AND_DOES_NOT_WANT
          : Children.HAS_NOT_AND_DOES_NOT_WANT;
      const result = await ctx.prisma.userProfile.create({
        data: {
          ...input,
          children: children,
          locationId: input.location.id,
          location: undefined,
          userId: ctx.session?.id,
          username: input.username ?? "",
          image: "",
          links: {},
          interactions: {},
          affections: {},
        },
      });
      return result;
    },
    update: async ({
      input,
      ctx,
    }: PrismaParameter<MutateProfileSchemaType>) => {
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
    },
    updateImage: async ({
      input,
      ctx,
    }: PrismaParameter<UpdateImageSchemaType>) => {
      const result = await ctx.prisma.userProfile.update({
        where: {
          userId: input.userId,
        },
        data: {
          image: input.image,
        },
      });
      return result;
    },
  },
};
