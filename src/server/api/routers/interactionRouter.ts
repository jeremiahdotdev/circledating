import { InteractionSchema } from "@/schemas/Interaction";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { interactionScripts } from "../prisma/interactionScripts";

export const interactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(InteractionSchema)
    .mutation(interactionScripts.mutate.create),
});
