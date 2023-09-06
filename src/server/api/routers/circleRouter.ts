import { ProfileSchema, ProfileSchemaType } from "@/schemas/Profile";
import { createTRPCRouter, publicProcedure } from "../trpc";
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
    .query(({ input, ctx }) => {
      return ctx.prisma.circle.findMany({
        where: {
          isPrivate: false,
          isFeatured: true,
          AND: isCompatibleWithCurrentUser(input.currentUserProfile),
        },
      });
    }),
  searchMany: publicProcedure
    .input(
      z.object({
        circleNamePartial: z.string(),
        currentUserProfile: ProfileSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.circle.findMany({
        take: 10,
        where: {
          name: {
            contains: input.circleNamePartial,
          },
          AND: isCompatibleWithCurrentUser(input.currentUserProfile),
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
