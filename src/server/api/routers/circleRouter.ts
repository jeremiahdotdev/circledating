import { CircleLink, UserLink } from "@prisma/client";
import { CircleSchemaType } from "@/schemas/Circle";
import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { RequestSchemaType } from "@/schemas/Request";
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
export const allRestrictions = {
  religionRestriction: true,
  sexRestriction: true,
  incomeRestriction: true,
  purityRestriction: true,
  activityRestriction: true,
  childrenRestriction: true,
  drinkingRestriction: true,
  continentRestriction: true,
  ethnicityRestriction: true,
  consumablesRestriction: true,
  maritalStatusRestriction: true,
  levelOfEducationRestriction: true,
  politicalBeliefsRestriction: true,
  willingToRelocateRestriction: true,
  onlyLookingForTraditionalHouseholdRestriction: true,
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
      const result = await ctx.prisma.circle.findUnique({
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
          links: true,
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
        include: {
          ...allRestrictions,
        },
      });

      const circle = {
        ...result,
        religionRestriction: result?.religionRestriction.map(
          (r) => r.restriction
        ),
        sexRestriction: result?.sexRestriction.map((r) => r.restriction),
        incomeRestriction: result?.incomeRestriction.map((r) => r.restriction),
        purityRestriction: result?.purityRestriction.map((r) => r.restriction),
        activityRestriction: result?.activityRestriction.map(
          (r) => r.restriction
        ),
        childrenRestriction: result?.childrenRestriction.map(
          (r) => r.restriction
        ),
        drinkingRestriction: result?.drinkingRestriction.map(
          (r) => r.restriction
        ),
        continentRestriction: result?.continentRestriction.map(
          (r) => r.restriction
        ),
        ethnicityRestriction: result?.ethnicityRestriction.map(
          (r) => r.restriction
        ),
        consumablesRestriction: result?.consumablesRestriction.map(
          (r) => r.restriction
        ),
        maritalStatusRestriction: result?.maritalStatusRestriction.map(
          (r) => r.restriction
        ),
        levelOfEducationRestriction: result?.levelOfEducationRestriction.map(
          (r) => r.restriction
        ),
        politicalBeliefsRestriction: result?.politicalBeliefsRestriction.map(
          (r) => r.restriction
        ),
        willingToRelocateRestriction: result?.willingToRelocateRestriction.map(
          (r) => r.restriction
        ),
        onlyLookingForTraditionalHouseholdRestriction:
          result?.onlyLookingForTraditionalHouseholdRestriction.map(
            (r) => r.restriction
          ),
      };

      return circle;
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
  requestToJoinCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
        currentUserProfile: ProfileSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.circleRequest.create({
        data: {
          message: "Requesting to join circle",
          circleId: input.circleId,
          userId: input.userId,
        },
      });
    }),
  denyRequestToJoinCircle: publicProcedure
    .input(
      z.object({
        circleId: z.string(),
        userId: z.string(),
        currentUserProfile: ProfileSchema,
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
});
