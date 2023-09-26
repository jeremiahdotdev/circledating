import {
  Consumables,
  Drinking,
  Gender,
  Income,
  PoliticalBeliefs,
  Religion,
} from "@prisma/client";
import { ParseCircle } from "@/schemas/Circle";
import { PrismaContext, PrismaParameter } from "../types";
import { UserPreferencesSchemaType } from "@/schemas/UserPreferences";

export const preferencesScripts = {
  query: {
    read: async ({ ctx }: PrismaContext) => {
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
        preferences: {
          sex: result?.preferences?.sex as Gender,
          drinking: result?.preferences?.drinking as Drinking[],
          consumables: result?.preferences?.consumables as Consumables[],
          politicalBeliefs: result?.preferences
            ?.politicalBeliefs as PoliticalBeliefs[],
          income: result?.preferences?.income as Income[],
          religion: result?.preferences?.religion as Religion[],
          searchContinents: result?.preferences?.searchContinents as string[],
          searchCountries: result?.preferences?.searchCountries as string[],
          searchStates: result?.preferences?.searchStates as string[],
          selectedCircles: result?.preferences?.selectedCircles.map((c) =>
            ParseCircle(c.Circle)
          ),
          ageRange: [
            result?.preferences?.minAge ?? 18,
            result?.preferences?.maxAge ?? 98,
          ],
        },
        circles: result?.profile?.circles.map((c) => c.Circle),
      };
    },
  },
  mutate: {
    save: async ({
      input,
      ctx,
    }: PrismaParameter<UserPreferencesSchemaType>) => {
      const data = {
        ...input,
        minAge: input.ageRange[0],
        maxAge: input.ageRange[1],
        sex: input.sex as Gender,
        drinking: input.drinking as Drinking[],
        consumables: input.consumables as Consumables[],
        politicalBeliefs: input.politicalBeliefs as PoliticalBeliefs[],
        income: input.income as Income[],
        religion: input.religion as Religion[],
        searchContinents: input.searchContinents as string[],
        searchCountries: input.searchCountries as string[],
        searchStates: input.searchStates as string[],
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
        create: data,
        update: data,
      });

      return result;
    },
  },
};
