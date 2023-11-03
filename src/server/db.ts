import { PrismaClient } from "@prisma/client";
import { circleScripts } from "./api/prisma/circleScripts";
import { conversationScripts } from "./api/prisma/conversationScripts";
import { env } from "../env";
import { interactionScripts } from "./api/prisma/interactionScripts";
import { messagesScripts } from "./api/prisma/messagesScripts";
import { preferencesScripts } from "./api/prisma/preferencesScripts";
import { profileScripts } from "./api/prisma/profileScripts";
import { reportScripts } from "./api/prisma/reportScripts";
import { userScripts } from "./api/prisma/userScripts";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = {
  circles: circleScripts,
  conversations: conversationScripts,
  interactions: interactionScripts,
  messages: messagesScripts,
  preferences: preferencesScripts,
  profile: profileScripts,
  report: reportScripts,
  user: userScripts,
};
