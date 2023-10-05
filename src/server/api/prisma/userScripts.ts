import { PrismaContext, PrismaParameter } from "../types";
import { SignupSchemaType } from "@/schemas/LoginSchema";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

export const userScripts = {
  query: {
    isActive: async ({ ctx }: PrismaContext) => {
      const result = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.id,
        },
        select: {
          isAdmin: true,
          profile: {
            select: {
              userId: true,
            },
          },
        },
      });

      return { isActive: !!result?.profile, isAdmin: result?.isAdmin };
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
