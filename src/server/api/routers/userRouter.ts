import { SignupSchema } from "@/schemas/LoginSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { userScripts } from "../prisma/userScripts";

export const userRouter = createTRPCRouter({
  stats: publicProcedure.query(userScripts.query.stats),
  signUp: publicProcedure
    .input(SignupSchema)
    .mutation(userScripts.mutate.signUp),
});
