import { prisma } from "../../src/server/db";

export const handleDisconnect = async () => {
  await prisma.$disconnect();
};
export const handlePrismaError = async (e: unknown) => {
  console.error(e);
  await prisma.$disconnect();
};
