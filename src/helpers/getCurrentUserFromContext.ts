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
import { ParseCircle, ReadCircleSchemaType } from "@/schemas/Circle";
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
        profile: true,
        preferences: {
          include: { selectedCircles: { select: { Circle: true } } },
        },
      },
    });
    if (currentUser) {
      if (currentUser.profile)
        user.profile = ParseProfile({
          ...currentUser.profile,
          circles: undefined,
          location: undefined,
        });

      if (currentUser.preferences) {
        const circles: ReadCircleSchemaType[] = [];
        currentUser.preferences.selectedCircles.map((c) => {
          const circle = ParseCircle(c.Circle);
          if (circle) circles.push(circle);
        });
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
          selectedCircles: circles,
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
