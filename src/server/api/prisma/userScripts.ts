import { Gender } from "@prisma/client";
import { ParsePreferences } from "@/schemas/UserPreferences";
import { PrismaContext, PrismaParameter } from "../types";
import { SignupSchemaType } from "@/schemas/LoginSchema";
import { TRPCError } from "@trpc/server";
import { handleError } from "@/utils/handleError";
import { hash } from "argon2";
import { prisma } from "@/server/db";
import dayjs from "dayjs";

export const userScripts = {
  query: {
    require: async ({ ctx }: PrismaContext) => {
      try {
        const email = ctx.session?.user?.email;
        if (!email) return null;

        const user = await prisma.user.findUniqueOrThrow({
          where: {
            email: email,
          },
          select: {
            username: true,
            preferences: true,
            circles: true,
            isAdmin: true,
            createdAt: true,
            profile: true,
            recievedMessages: {
              select: { conversationId: true },
              where: {
                isRead: false,
              },
            },
          },
        });

        const userSlice = {
          isAuthed: true,
          isActive: !!user?.profile,
          isAdmin: !!user?.isAdmin,
          isMale: user?.profile?.sex == Gender.MALE,
          userId: user?.profile?.userId ?? "",
          username: user.username ?? "",
          notifications: new Set(user.recievedMessages).size,
          isNew: dayjs(user.createdAt) > dayjs().subtract(1, "day"),
          circles: user.circles,
          preferences: ParsePreferences(user?.preferences),
        };

        return { user: userSlice };
      } catch (error: unknown) {
        handleError(error);
      }
    },
    stats: async ({ ctx }: PrismaContext) => {
      let isActive = false;
      let isAdmin = false;
      let isMale = false;
      let isNew = false;
      let userId = "";
      let username = "";
      let notifications = 0;
      try {
        const result = await ctx.prisma.user.findUniqueOrThrow({
          where: {
            id: ctx.session?.id,
          },
          select: {
            isAdmin: true,
            username: true,
            createdAt: true,
            profile: {
              select: {
                userId: true,
                sex: true,
              },
            },
            recievedMessages: {
              select: { conversationId: true },
              where: {
                isRead: false,
              },
            },
          },
        });
        isActive = !!result?.profile;
        isAdmin = !!result?.isAdmin;
        isMale = result?.profile?.sex == Gender.MALE;
        userId = result?.profile?.userId ?? "";
        username = result.username ?? "";
        notifications = new Set(result.recievedMessages).size;
        isNew = dayjs(result.createdAt) > dayjs().subtract(1, "day");
      } catch (error: unknown) {
        handleError(error);
      }
      return {
        userId: userId,
        username: username,
        isActive: isActive,
        isAdmin: isAdmin,
        isMale: isMale,
        isNew: isNew,
        notifications: notifications,
      };
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
