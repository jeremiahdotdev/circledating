import {
  CircleUserSchemaType,
  CircleUserSearchSchemaType,
  MutateCircleSchemaType,
  ReadCircleSchemaType,
  UpdateImageSchemaType,
} from "@/schemas/Circle";
import { Prisma, UserType } from "@prisma/client";
import { PrismaContext, PrismaParameter } from "../types";
import { ProfileSchemaType } from "@/schemas/Profile";
import { RequestSchemaType } from "@/schemas/Request";
import { getCurrentUserFromContext } from "@/helpers/getCurrentUserFromContext";
import { parseAsIdentifier } from "@/utils/parseAsIdentifier";

// Helpers
export const isCompatibleWithCurrentUser = (
  currentUserProfile: ProfileSchemaType
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
    readById: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          name: input,
        },
        include: {
          users: {
            where: {
              userId: ctx.session?.id,
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

      const circle = {
        ...result,
        requests: result?.requests?.map((r) => ({
          ...r,
          username: r.author.username,
        })) as RequestSchemaType[],
      };

      return circle;
    },
    readByCode: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          code: input,
        },
      });
      return result;
    },
    readFeatured: async ({ ctx }: PrismaContext) => {
      let returnValue;
      const { profile } = await getCurrentUserFromContext(ctx);
      if (profile) {
        const result = await ctx.prisma.circle.findMany({
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

        returnValue = result.map((c) => {
          const circle: ReadCircleSchemaType = {
            ...c,
            ...noRestrictions,
            links: [],
            users: [],
            image: c.image ?? "",
            createdAt: c.createdAt.toLocaleDateString(),
            updatedAt: c.updatedAt?.toLocaleDateString() ?? "",
          };
          return circle;
        });
      }
      return returnValue;
    },
    readCurrent: async ({ ctx }: PrismaContext) => {
      const result = await ctx.prisma.circle.findMany({
        where: {
          users: {
            some: {
              userId: ctx.session?.id,
            },
          },
        },
      });

      const circles: ReadCircleSchemaType[] = result.map((c) => {
        const circle: ReadCircleSchemaType = {
          ...c,
          ...noRestrictions,
          links: [],
          users: [],
          image: c.image ?? "",
          createdAt: c.createdAt.toLocaleDateString(),
          updatedAt: c.updatedAt?.toLocaleDateString() ?? "",
        };
        return circle;
      });

      return circles;
    },
    searchMany: async ({ input, ctx }: PrismaParameter<string>) => {
      let circles: CircleSchemaType[] = [];
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

        circles = result.map((c) => {
          const circle: CircleSchemaType = {
            ...c,
            ...noRestrictions,
            users: [],
            image: c.image ?? "",
            links: [],
          };
          return circle;
        });
      }
      return circles;
    },
    searchCircleForUser: async ({
      input,
      ctx,
    }: PrismaParameter<CircleUserSearchSchemaType>) => {
      const result = await ctx.prisma.userProfile.findMany({
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
        include: {
          location: true,
        },
      });

      return result.map((r) => ({
        ...r,
        links: r.links?.valueOf(),
      })) as ProfileSchemaType[];
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
