import {
  MutateProfileSchemaType,
  ProfileSchemaType,
  isProfile,
} from "@/schemas/Profile";
import { PrismaContext, PrismaParameter } from "../types";
import { UpdateImageSchemaType } from "@/schemas/Profile";
import { UserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { getCurrentUserFromContext } from "@/helpers/getCurrentUserFromContext";

export const handlePreferences = (preferences?: UserPreferencesSchemaType) => {
  if (!preferences) return [{}];
  const filters = [];
  if (preferences.selectedCircles)
    filters.push({
      circles: {
        some: {
          circleId: {
            in: preferences?.selectedCircles?.map((circle) => circle.id ?? "0"),
          },
        },
      },
    });
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
  currentUser: ProfileSchemaType,
  profile: ProfileSchemaType
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
      const result = await ctx.prisma.userProfile.findMany({
        where: {
          AND: handlePreferences(preferences),
          affections: {
            none: {
              initiatedUserId: profile.userId,
            },
          },
          NOT: { sex: profile.sex },
        },
        include: {
          location: true,
          circles: true,
        },
      });
      const profiles: ProfileSchemaType[] = [];
      result.forEach((r) => {
        const itemAsProfile = {
          ...r,
          links: [],
          interactions: [],
          circles: r.circles.map((c) => ({ id: c.circleId })),
        };
        if (isProfile(itemAsProfile)) {
          itemAsProfile.isPerfectMatch = IsProfilePerfectMatch(
            profile,
            itemAsProfile
          );
          itemAsProfile.likesYou = !!profile.affections?.filter(
            (a) => a.initiatedUserId == itemAsProfile.userId
          ).length;
          profiles.push(itemAsProfile as ProfileSchemaType);
        }
      });
      return profiles;
    },
    read: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.userProfile.findUnique({
        where: {
          username: input,
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
      const result = await ctx.prisma.userProfile.create({
        data: {
          ...input,
          location: {
            connectOrCreate: {
              create: { ...input.location },
              where: { id: input.location.id },
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
