import { SignupSchema } from "@/schemas/LoginSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { userScripts } from "../prisma/userScripts";

export const userRouter = createTRPCRouter({
  isActive: publicProcedure.query(userScripts.query.isActive),
  signUp: publicProcedure
    .input(SignupSchema)
    .mutation(userScripts.mutate.signUp),
});
