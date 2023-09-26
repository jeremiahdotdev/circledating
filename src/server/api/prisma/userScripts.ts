import { PrismaParameter } from "../types";
import { SignupSchemaType } from "@/schemas/LoginSchema";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

export const userScripts = {
  query: {
    readProfileByUserEmail: async ({ input, ctx }: PrismaParameter<string>) => {
      const result = await ctx.prisma.user.findUnique({
        where: {
          email: input,
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
    },
  },
  mutate: {
    signUp: async ({ input, ctx }: PrismaParameter<SignupSchemaType>) => {
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
    },
  },
};
