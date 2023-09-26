import { UserPreferencesSchema } from "@/schemas/UserPreferences";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { preferencesScripts } from "../prisma/preferencesScripts";

export const preferencesRouter = createTRPCRouter({
  read: publicProcedure
    .input(UserPreferencesSchema)
    .mutation(preferencesScripts.mutate.save),
  save: publicProcedure
    .input(UserPreferencesSchema)
    .mutation(preferencesScripts.mutate.save),
});
