import { CircleSchemaType } from "@/schemas/Circle";
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
import { LinkSchemaType } from "@/schemas/Link";
import { ProfileSchemaType } from "@/schemas/Profile";
import { Session } from "next-auth";
import { UserPreferencesSchemaType } from "@/schemas/UserPreferences";

export const getCurrentUserFromContext = async (ctx: {
  session: Session | null;
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
}) => {
  const user: {
    profile?: ProfileSchemaType;
    preferences?: UserPreferencesSchemaType;
  } = {};
  if (ctx.session?.user?.name) {
    const currentUser = await ctx.prisma.user.findUnique({
      where: { username: ctx.session.user.name },
      select: {
        profile: true,
        preferences: {
          include: { selectedCircles: { select: { Circle: true } } },
        },
      },
    });
    if (currentUser) {
      if (currentUser.profile)
        user.profile = {
          ...currentUser.profile,
          links: currentUser.profile.links as LinkSchemaType[],
          image: currentUser.profile.image ?? "",
        };

      if (currentUser.preferences)
        user.preferences = {
          ...currentUser.preferences,
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
          selectedCircles: currentUser.preferences.selectedCircles.map(
            (c) => c.Circle as CircleSchemaType
          ),
          ageRange: [
            currentUser.preferences.minAge,
            currentUser.preferences.maxAge,
          ],
        };
    }
  }
  return user;
};
