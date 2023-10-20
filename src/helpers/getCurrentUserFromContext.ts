import {
  Consumables,
  Drinking,
  Income,
  PoliticalBeliefs,
  Prisma,
  PrismaClient,
  Religion,
} from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ParseProfile, ReadProfileSchemaType } from "@/schemas/Profile";
import { ReadUserPreferencesSchemaType } from "@/schemas/UserPreferences";
import { Session } from "next-auth";
import { getOppositeSex } from "@/schemas/Gender";

export const getCurrentUserFromContext = async (ctx: {
  session: Session | null;
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}) => {
  const user: {
    profile?: ReadProfileSchemaType;
    preferences?: ReadUserPreferencesSchemaType;
  } = {};
  if (ctx.session?.user?.name) {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.id },
      select: {
        profile: {
          include: {
            circles: {
              select: {
                isSelected: true,
                Circle: true,
              },
            },
          },
        },
        preferences: true,
      },
    });

    if (currentUser) {
      if (currentUser.profile) {
        user.profile = ParseProfile({
          ...currentUser.profile,
          location: undefined,
          interactions: undefined,
        });
      }

      if (currentUser.preferences) {
        user.preferences = {
          ...currentUser.preferences,
          sex: getOppositeSex(currentUser.profile?.sex),
          drinking: currentUser.preferences.drinking as Drinking[],
          consumables: currentUser.preferences.consumables as Consumables[],
          politicalBeliefs: currentUser.preferences
            .politicalBeliefs as PoliticalBeliefs[],
          income: currentUser.preferences.income as Income[],
          religion: currentUser.preferences.religion as Religion[],
          searchContinents: currentUser.preferences
            .searchContinents as string[],
          searchCountries: currentUser.preferences.searchCountries as string[],
          searchStates: currentUser.preferences.searchStates as string[],
          ageRange: [
            currentUser.preferences.minAge,
            currentUser.preferences.maxAge,
          ],
        };
      }
    }
  }
  return user;
};
