import {
  CircleSchemaType,
  CreateCircleSchema,
  UpdateCircleSchema,
  UpdateImageSchema,
} from "@/schemas/Circle";
import { Prisma, UserType } from "@prisma/client";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { RequestSchemaType } from "@/schemas/Request";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getCurrentUserFromContext } from "@/helpers/getCurrentUserFromContext";
import { parseAsIdentifier } from "@/utils/parseAsIdentifier";
import { systemMessages } from "@/globals/systemMessages";
import { trpcResult } from "@/utils/trpcResult";
import { z } from "zod";

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

export const circleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ circle: CreateCircleSchema, user: ProfileSchema }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) return trpcResult(systemMessages.NO_PROFILE);
      const result = await ctx.prisma.circle.create({
        data: {
          ...input.circle,
          name: parseAsIdentifier(input.circle.label),
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
      return result;
    }),
  update: publicProcedure
    .input(UpdateCircleSchema)
    .mutation(async ({ input, ctx }) => {
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
    }),
  updateImage: publicProcedure
    .input(UpdateImageSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });
      return result;
    }),
  read: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          name: input.name,
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
    }),
  readByCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findUnique({
        where: {
          code: input.code,
        },
      });

      const circle = {
        ...result,
      };

      return circle;
    }),
  readFeatured: publicProcedure.query(async ({ ctx }) => {
    const { profile } = await getCurrentUserFromContext(ctx);
    if (!profile) return trpcResult(systemMessages.NO_PROFILE);
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

    const circles: CircleSchemaType[] = result.map((c) => {
      const circle: CircleSchemaType = {
        ...c,
        ...noRestrictions,
        links: [],
        users: [],
        image: c.image ?? "",
      };
      return circle;
    });

    return circles;
  }),
  readCurrentCircles: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.circle.findMany({
      where: {
        users: {
          some: {
            userId: ctx.session?.id,
          },
        },
      },
    });

    const circles: CircleSchemaType[] = result.map((c) => {
      const circle: CircleSchemaType = {
        ...c,
        ...noRestrictions,
        links: [],
        users: [],
        image: c.image ?? "",
      };
      return circle;
    });

    return circles;
  }),
  searchMany: publicProcedure
    .input(
      z.object({
        circleNamePartial: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { profile } = await getCurrentUserFromContext(ctx);
      if (!profile) return systemMessages.NO_PROFILE;
      const result = await ctx.prisma.circle.findMany({
        take: 10,
        where: {
          name: {
            contains: input.circleNamePartial,
          },
          AND: isCompatibleWithCurrentUser(profile),
        },
      });

      const circles: CircleSchemaType[] = result.map((c) => {
        const circle: CircleSchemaType = {
          ...c,
          ...noRestrictions,
          users: [],
          image: c.image ?? "",
          links: [],
        };
        return circle;
      });

      return circles;
    }),
  searchCircleForUser: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        usernamePartial: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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
    }),
  removeUserFromCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userCircle.deleteMany({
        where: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    }),
  removeSelfFromCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.userCircle.deleteMany({
        where: {
          circleId: input.circleId,
          userId: ctx.session.id,
        },
      });
    }),
  addSelfToCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.userCircle.create({
        data: {
          circleId: input.circleId,
          userId: ctx.session.id,
        },
      });
    }),
  addUserToCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userCircle.create({
        data: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    }),
  requestToJoinCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx?.session?.id) return;

      return ctx.prisma.circleRequest.create({
        data: {
          message: "Requesting to join circle",
          circleId: input.circleId,
          userId: ctx.session.id,
        },
      });
    }),
  denyRequestToJoinCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.circleRequest.deleteMany({
        where: {
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    }),
  isCircleNameUnique: publicProcedure
    .input(
      z.object({
        label: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findMany({
        where: {
          name: {
            equals: parseAsIdentifier(input.label),
          },
        },
        select: {
          id: true,
        },
      });
      return !result.length;
    }),
});
