import {
  CircleUserSchemaType,
  CircleUserSearchSchemaType,
  MutateCircleSchemaType,
  ParseCircle,
  ParseCircles,
  ReadCircleSchemaType,
  UpdateImageSchemaType,
} from "@/schemas/Circle";
import { ParseProfile, ReadProfileSchemaType } from "@/schemas/Profile";
import { Prisma, UserType } from "@prisma/client";
import { PrismaContext, PrismaParameter } from "../types";
import { getCurrentUserFromContext } from "@/helpers/getCurrentUserFromContext";
import { parseAsIdentifier } from "@/utils/parseAsIdentifier";

// Helpers
export const isCompatibleWithCurrentUser = (
  currentUserProfile: ReadProfileSchemaType
) => [
  {
    OR: [
      {
        religionRestriction: {
          array_contains: currentUserProfile.religion,
        },
      },
      {
        religionRestriction: {
          equals: Prisma.AnyNull,
        },
      },
    ],
  },
  {
    OR: [
      {
        politicalBeliefsRestriction: {
          array_contains: currentUserProfile.politicalBeliefs,
        },
      },
      {
        politicalBeliefsRestriction: {
          equals: Prisma.AnyNull,
        },
      },
    ],
  },
  {
    OR: [
      {
        countryRestriction: {
          array_contains: currentUserProfile?.location?.continent,
        },
      },
      {
        countryRestriction: {
          equals: Prisma.AnyNull,
        },
      },
    ],
  },
  {
    OR: [
      {
        sexRestriction: {
          array_contains: currentUserProfile.sex,
        },
      },
      {
        sexRestriction: {
          equals: Prisma.AnyNull,
        },
      },
    ],
  },
];

export const noRestrictions = {
  religionRestriction: [],
  sexRestriction: [],
  incomeRestriction: [],
  purityRestriction: [],
  activityRestriction: [],
  childrenRestriction: [],
  drinkingRestriction: [],
  countryRestriction: [],
  ethnicityRestriction: [],
  consumablesRestriction: [],
  maritalStatusRestriction: [],
  levelOfEducationRestriction: [],
  politicalBeliefsRestriction: [],
  willingToRelocateRestriction: [],
  customRestriction: [],
};
export const allRestrictions = {
  religionRestriction: true,
  sexRestriction: true,
  incomeRestriction: true,
  purityRestriction: true,
  activityRestriction: true,
  childrenRestriction: true,
  drinkingRestriction: true,
  countryRestriction: true,
  ethnicityRestriction: true,
  consumablesRestriction: true,
  maritalStatusRestriction: true,
  levelOfEducationRestriction: true,
  politicalBeliefsRestriction: true,
  willingToRelocateRestriction: true,
};

// Scripts
export const circleScripts = {
  query: {
    readByName: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          name: input,
        },
        include: {
          users: {
            where: {
              userId: ctx.session?.id ?? "",
            },
            select: {
              userId: true,
            },
          },
          requests: {
            select: {
              id: true,
              userId: true,
              circleId: true,
              message: true,
              author: {
                select: {
                  username: true,
                },
              },
              createdAt: true,
            },
          },
          reports: true,
          _count: {
            select: { users: true },
          },
        },
      });

      return ParseCircle(result);
    },
    readByCode: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          code: input,
        },
      });
      return ParseCircle(result);
    },
    readFeatured: async ({ ctx }: PrismaContext) => {
      let returnValue;
      const { profile } = await getCurrentUserFromContext(ctx);
      if (profile) {
        const circles = await ctx.prisma.circle.findMany({
          take: 5,
          where: {
            isPrivate: false,
            isFeatured: true,
            AND: isCompatibleWithCurrentUser(profile),
            users: {
              none: {
                userId: profile.userId,
              },
            },
          },
        });

        returnValue = ParseCircles(circles);
      }
      return returnValue;
    },
    readCurrent: async ({ ctx }: PrismaContext) => {
      const circles = await ctx.prisma.userCircle.findMany({
        where: {
          userId: ctx.session?.id,
        },
        select: {
          circle: true,
        },
      });

      const result: ReadCircleSchemaType[] = ParseCircles(
        circles.map((c) => c.circle)
      );

      return result;
    },
    searchMany: async ({ input, ctx }: PrismaParameter<string>) => {
      const circles: ReadCircleSchemaType[] = [];
      const { profile } = await getCurrentUserFromContext(ctx);
      if (profile) {
        const result = await ctx.prisma.circle.findMany({
          take: 10,
          where: {
            name: {
              contains: input,
            },
            AND: isCompatibleWithCurrentUser(profile),
          },
        });

        result.map((c) => {
          const circle = ParseCircle(c);
          if (circle) circles.push(circle);
        });
      }
      return circles;
    },
    searchCircleForUser: async ({
      input,
      ctx,
    }: PrismaParameter<CircleUserSearchSchemaType>) => {
      const result = await ctx.prisma.user.findMany({
        take: 100,
        where: {
          username: {
            contains: input.usernamePartial,
          },
          circles: {
            some: {
              circleId: input.circleId,
            },
          },
        },
        select: {
          profile: true,
        },
      });

      const profiles: ReadProfileSchemaType[] = [];
      result.map((r) => {
        if (r.profile) {
          const profile = ParseProfile({
            ...r.profile,
            user: undefined,
            location: undefined,
            interactions: undefined,
          });
          if (profile) profiles.push(profile);
        }
      });
      return profiles;
    },
    isCircleNameUnique: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.circle.findMany({
        where: {
          name: {
            equals: parseAsIdentifier(input),
          },
        },
        select: {
          id: true,
        },
      });
      return !result.length;
    },
  },
  mutate: {
    create: async ({ input, ctx }: PrismaParameter<MutateCircleSchemaType>) => {
      let returnValue;
      if (ctx.session?.user) {
        returnValue = await ctx.prisma.circle.create({
          data: {
            ...input,
            name: parseAsIdentifier(input.label),
            users: {
              create: {
                userId: ctx.session.id,
                circleTitle: UserType.CIRCLE_OWNER,
              },
            },
            requests: undefined,
            reports: undefined,
          },
        });
      }
      return returnValue;
    },
    update: async ({ input, ctx }: PrismaParameter<MutateCircleSchemaType>) => {
      const result = await ctx.prisma.circle.update({
        data: {
          description: input.description,
          links: input.links,
        },
        where: {
          name: input.name,
        },
      });
      return result;
    },
    updateImage: async ({
      input,
      ctx,
    }: PrismaParameter<UpdateImageSchemaType>) => {
      const result = await ctx.prisma.circle.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });
      return result;
    },
    removeUserFromCircle: async ({
      input,
      ctx,
    }: PrismaParameter<CircleUserSchemaType>) => {
      return ctx.prisma.userCircle.deleteMany({
        where: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    },
    removeSelfFromCircle: async ({ input, ctx }: PrismaParameter<string>) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.userCircle.deleteMany({
        where: {
          circleId: input,
          userId: ctx.session.id,
        },
      });
    },
    addSelfToCircle: async ({ input, ctx }: PrismaParameter<string>) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.userCircle.create({
        data: {
          circleId: input,
          userId: ctx.session.id,
        },
      });
    },
    addUserToCircle: async ({
      input,
      ctx,
    }: PrismaParameter<CircleUserSchemaType>) => {
      return ctx.prisma.userCircle.create({
        data: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    },
    requestToJoinCircle: async ({ input, ctx }: PrismaParameter<string>) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.circleRequest.create({
        data: {
          message: "Requesting to join circle",
          circleId: input,
          userId: ctx.session.id,
        },
      });
    },
    denyRequestToJoinCircle: async ({
      input,
      ctx,
    }: PrismaParameter<CircleUserSchemaType>) => {
      return ctx.prisma.circleRequest.deleteMany({
        where: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    },
  },
};
