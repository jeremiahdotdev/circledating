import { Messages } from "./data";
import { UserMessage } from "@prisma/client";
import { handleError } from "./util";
import { prisma } from "../../src/server/db";

export async function seedMessages() {
  const messages: UserMessage[] = Messages.map((message, index) => ({
    id: index.toString(),
    conversationId: index.toString(),
    authorUsername: message.authorUsername,
    recipientUsername: message.recipientUsername,
    content: message.content,
    createdAt: new Date(),
    updatedAt: null,
  }));

  try {
    await prisma.userMessage.createMany({
      data: messages,
    });
  } catch (error: unknown) {
    await handleError(error);
  }
}
