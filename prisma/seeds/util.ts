import { handleError } from "@/utils/handleError";
import { prisma } from "../../src/server/db";

export const handleDisconnect = async () => {
  await prisma.$disconnect();
};
export const handlePrismaError = async (e: unknown) => {
  handleError(e);
  await prisma.$disconnect();
};
