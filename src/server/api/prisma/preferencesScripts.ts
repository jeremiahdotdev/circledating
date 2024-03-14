import {
  Consumables,
  Drinking,
  Income,
  PoliticalBeliefs,
  Religion,
} from "@prisma/client";
import {
  MutateUserPreferencesSchemaType,
  ParsePreferences,
} from "@/schemas/UserPreferences";
import { ParseCircle, SelectedCirclesSchemaType } from "@/schemas/Circle";
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
          preferences: true,
          circles: {
            select: {
              isSelected: true,
              circle: true,
            },
          },
        },
      });

      return {
        preferences: ParsePreferences(result?.preferences),
        circles: result?.circles.map((c) =>
          ParseCircle(c.circle, c.isSelected)
        ),
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
    }: PrismaParameter<SelectedCirclesSchemaType>) => {
      const transaction = await ctx.prisma.$transaction(
        input.circles.map((circle) =>
          ctx.prisma.userCircle.updateMany({
            where: {
              userId: ctx.session?.id,
              circleId: circle.id,
            },
            data: {
              isSelected: input.selectedCircles.includes(circle.name),
            },
          })
        )
      );
      return transaction;
    },
  },
};
