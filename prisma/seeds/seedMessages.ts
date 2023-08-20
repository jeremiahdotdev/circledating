import { Messages } from "./data";
import { UserMessage } from "@prisma/client";
import { handleDisconnect, handleError } from "./util";
import { prisma } from "../../src/server/db";

export function seedMessages() {
  const messages: UserMessage[] = Messages.map((message, index) => ({
    id: index.toString(),
    authorUsername: message.authorUsername,
    recipientUsername: message.recipientUsername,
    content: message.content,
    createdAt: new Date(),
    updatedAt: null,
  }));

  prisma.userMessage
    .createMany({
      data: messages,
    })
    .then(handleDisconnect)
    .catch(handleError);
}
