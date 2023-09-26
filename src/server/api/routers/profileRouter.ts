import { MutateProfileSchema, UpdateImageSchema } from "@/schemas/Profile";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { profileScripts } from "../prisma/profileScripts";
import { z } from "zod";

export const profileRouter = createTRPCRouter({
  create: publicProcedure
    .input(MutateProfileSchema)
    .mutation(profileScripts.mutate.create),
  update: publicProcedure
    .input(MutateProfileSchema)
    .mutation(profileScripts.mutate.update),
  updateImage: publicProcedure
    .input(UpdateImageSchema)
    .mutation(profileScripts.mutate.updateImage),
  readProfiles: publicProcedure.query(profileScripts.query.readProfiles),
  read: publicProcedure.input(z.string()).mutation(profileScripts.query.read),
  isUsernameUnique: publicProcedure
    .input(z.string())
    .mutation(profileScripts.query.isUsernameUnique),
});
