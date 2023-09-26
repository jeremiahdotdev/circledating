import { SignupSchema } from "@/schemas/LoginSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { userScripts } from "../prisma/userScripts";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  readProfileByUserEmail: publicProcedure
    .input(z.string())
    .mutation(userScripts.query.readProfileByUserEmail),
  signUp: publicProcedure
    .input(SignupSchema)
    .mutation(userScripts.mutate.signUp),
});
