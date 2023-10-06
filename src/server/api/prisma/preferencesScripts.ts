import {
  Consumables,
  Drinking,
  Gender,
  Income,
  PoliticalBeliefs,
  Religion,
} from "@prisma/client";
import {
  MutateUserPreferencesSchemaType,
  ParsePreferences,
} from "@/schemas/UserPreferences";
import { ParseCircle } from "@/schemas/Circle";
import { PrismaContext, PrismaParameter } from "../types";
import { getOppositeSex } from "@/schemas/Gender";

export const preferencesScripts = {
  query: {
    read: async ({ ctx }: PrismaContext) => {
      if (!ctx.session?.id) return { preferences: null, circles: null };
      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.id,
        },
        select: {
          preferences: {
            include: {
              selectedCircles: {
                select: {
                  Circle: true,
                },
              },
            },
          },
          profile: {
            select: {
              userId: true,
              circles: {
                select: {
                  Circle: true,
                },
              },
            },
          },
        },
      });

      return {
        preferences: ParsePreferences(result?.preferences),
        circles: result?.profile?.circles.map((c) => ParseCircle(c.Circle)),
      };
    },
  },
  mutate: {
    save: async ({
      input,
      ctx,
    }: PrismaParameter<MutateUserPreferencesSchemaType>) => {
      const [minAge, maxAge] = input.ageRange ?? [18, 99];
      const data = {
        userId: ctx.session?.id ?? "",
        minAge: minAge,
        maxAge: maxAge,
        sex: getOppositeSex(ctx.session?.sex),
        drinking: input.drinking as Drinking[],
        consumables: input.consumables as Consumables[],
        politicalBeliefs: input.politicalBeliefs as PoliticalBeliefs[],
        income: input.income as Income[],
        religion: input.religion as Religion[],
        searchContinents: input.searchContinents as string[],
        searchCountries: input.searchCountries as string[],
        searchStates: input.searchStates as string[],
      };
      const result = await ctx.prisma.userPreferences.upsert({
        where: {
          userId: ctx.session?.id,
        },
        create: data,
        update: data,
      });

      return result;
    },
    saveCircles: async ({
      input,
      ctx,
    }: PrismaParameter<MutateUserPreferencesSchemaType>) => {
      const data = {
        userId: ctx.session?.id ?? "",
        selectedCircles: {
          connect: input.selectedCircles?.map((c) => ({
            id: c.id,
          })),
        },
      };
      const result = await ctx.prisma.userPreferences.upsert({
        where: {
          userId: ctx.session?.id,
        },
        create: { ...data, minAge: 18, maxAge: 99 },
        update: data,
      });

      return result;
    },
  },
};
