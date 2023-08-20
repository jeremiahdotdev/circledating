import { prisma } from "../../src/server/db";

export const handleDisconnect = async () => {
  await prisma.$disconnect();
};
export const handleError = async (e: string) => {
  console.error(e);
  await prisma.$disconnect();
};
