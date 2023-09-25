import { SignupSchema } from "@/schemas/LoginSchema";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { hash } from "argon2";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(SignupSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, password, email } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { email, password: hashedPassword, username: username },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),
  readProfileByUserEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
        include: {
          profile: true,
        },
      });

      const profile = result?.profile;

      if (profile) {
        return { profile: profile, hasProfile: true };
      } else {
        return { hasProfile: false };
      }
    }),
});
