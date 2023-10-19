import { MutateUserPreferencesSchema } from "@/schemas/UserPreferences";
import { SelectedCirclesSchema } from "@/schemas/Circle";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { preferencesScripts } from "../prisma/preferencesScripts";

export const preferencesRouter = createTRPCRouter({
  read: publicProcedure.query(preferencesScripts.query.read),
  save: publicProcedure
    .input(MutateUserPreferencesSchema)
    .mutation(preferencesScripts.mutate.save),
  saveCircles: publicProcedure
    .input(SelectedCirclesSchema)
    .mutation(preferencesScripts.mutate.saveCircles),
});
