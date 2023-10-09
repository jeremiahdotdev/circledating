import { ConversationsList } from "../../components/Messages/ConversationsList";
import { Gender } from "@prisma/client";
import { MessagesPane } from "../../components/Messages/MessagesPane";
import { MutateMessageSchemaType } from "@/schemas/Message";
import { NewMessageForm } from "../../components/Messages/NewMessageForm";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useState } from "react";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React from "react";

export type ConversationsViewProps = {
  userId: string;
  userSex: Gender;
  conversations: ReadConversationSchemaType[];
  actionIsUnblock: boolean;
};

export const ConversationsView = memo(function ConversationsView({
  userId,
  userSex,
  conversations,
  actionIsUnblock,
}: ConversationsViewProps) {
  const router = useRouter();
  const [conversationState, setConversationState] =
    useState<ReadConversationSchemaType>();
  const handleSelectConversation = useCallback(
    (conversation: ReadConversationSchemaType) => {
      setConversationState(conversation);
    },
    []
  );
  const handleRoute = useCallback(
    (conversation: ReadConversationSchemaType) => {
      const usernames = conversation.users
        ?.filter((user) => user.userId !== userId)
        ?.map((user) => user.username)
        ?.join(",");
      router.push(routes.messagesByUsername(usernames).href).catch(handleError);
    },
    [router, userId]
  );

  const onSend = useCallback(
    (message: MutateMessageSchemaType) => {
      setConversationState({
        id: conversationState?.id ?? "",
        messages: conversationState
          ? [
              {
                ...message,
                conversationId: message.conversationId ?? "",
                createdAt: message.createdAt?.toLocaleString() ?? "",
                updatedAt: message.createdAt?.toLocaleString() ?? "",
                isRead: true,
              },
              ...conversationState.messages,
            ]
          : [],
        users: conversationState?.users ?? [],
      });
    },
    [conversationState]
  );

  return (
    <>
      <div className="lg:invisible lg:h-0 lg:w-0">
        <ConversationsList
          conversations={conversations}
          onSelect={handleRoute}
          actionIsUnblock={actionIsUnblock}
        />
      </div>
      <div className="invisible flex h-0 w-0 lg:visible lg:min-h-window lg:w-full">
        <div className="md:w-1/4 ">
          <ConversationsList
            conversations={conversations}
            actionIsUnblock={actionIsUnblock}
            onSelect={handleSelectConversation}
          />
        </div>
        <div className="flex h-full w-3/4 flex-col">
          <div className="h-full p-4 shadow-inner-xl">
            <MessagesPane messages={conversationState?.messages} />
          </div>
          <NewMessageForm
            gender={userSex}
            recipientUsername={
              conversationState?.users?.find((user) => user.userId != userId)
                ?.username
            }
            conversationId={conversationState?.id}
            onSend={onSend}
          />
        </div>
      </div>
    </>
  );
});
