import { CircleLink, UserLink } from "@prisma/client";
import { CircleSchemaType } from "@/schemas/Circle";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getSecureLinks } from "@/schemas/Link";
import { z } from "zod";

export const isCompatibleWithCurrentUser = (
  currentUserProfile: ProfileSchemaType
) => [
  {
    OR: [
      {
        religionRestriction: {
          some: {
            restriction: currentUserProfile.religion,
          },
        },
      },
      {
        religionRestriction: {
          none: {},
        },
      },
    ],
  },
  {
    OR: [
      {
        politicalBeliefsRestriction: {
          some: {
            restriction: currentUserProfile.politicalBeliefs,
          },
        },
      },
      {
        politicalBeliefsRestriction: {
          none: {},
        },
      },
    ],
  },
  {
    OR: [
      {
        continentRestriction: {
          some: {
            restriction: currentUserProfile.location.continent,
          },
        },
      },
      {
        continentRestriction: {
          none: {},
        },
      },
    ],
  },
  {
    OR: [
      {
        sexRestriction: {
          some: {
            restriction: currentUserProfile.sex,
          },
        },
      },
      {
        sexRestriction: {
          none: {},
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
  continentRestriction: [],
  ethnicityRestriction: [],
  consumablesRestriction: [],
  maritalStatusRestriction: [],
  levelOfEducationRestriction: [],
  politicalBeliefsRestriction: [],
  willingToRelocateRestriction: [],
  onlyLookingForTraditionalHouseholdRestriction: [],
  customRestriction: [],
};
export const secureLinks = (links: UserLink[] | CircleLink[] | undefined) => ({
  links: getSecureLinks(links),
});

export const circleRouter = createTRPCRouter({
  read: publicProcedure
    .input(
      z.object({
        name: z.string(),
        currentUserProfile: ProfileSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const data = await ctx.prisma.circle.findUnique({
        where: {
          name: input.name,
        },
        include: {
          users: {
            where: {
              userId: input.currentUserProfile.userId,
            },
            select: {
              userId: true,
            },
          },
          links: true,
          _count: {
            select: { users: true },
          },
        },
      });
      return data;
    }),
  readFeatured: publicProcedure
    .input(
      z.object({
        currentUserProfile: ProfileSchema,
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findMany({
        take: 5,
        where: {
          isPrivate: false,
          isFeatured: true,
          AND: isCompatibleWithCurrentUser(input.currentUserProfile),
          users: {
            none: {
              userId: input.currentUserProfile.userId,
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
        };
        return circle;
      });

      return circles;
    }),
  readCirclesByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findMany({
        where: {
          users: {
            some: input,
          },
        },
      });

      const circles: CircleSchemaType[] = result.map((c) => {
        const circle: CircleSchemaType = {
          ...c,
          ...noRestrictions,
          links: [],
          users: [],
        };
        return circle;
      });

      return circles;
    }),
  searchMany: publicProcedure
    .input(
      z.object({
        circleNamePartial: z.string(),
        currentUserProfile: ProfileSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.prisma.circle.findMany({
        take: 10,
        where: {
          name: {
            contains: input.circleNamePartial,
          },
          AND: isCompatibleWithCurrentUser(input.currentUserProfile),
        },
        include: {
          links: true,
        },
      });

      const circles: CircleSchemaType[] = result.map((c) => {
        const circle: CircleSchemaType = {
          ...c,
          ...noRestrictions,
          ...secureLinks(c?.links),
          users: [],
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
        currentUserProfile: ProfileSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userProfile.findMany({
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
    }),
  removeUserFromCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
        currentUserProfile: ProfileSchema,
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
  addUserToCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
        currentUserProfile: ProfileSchema,
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
});
