"use client";

import { Gender } from "@prisma/client";
import { Infographic } from "@/components/Shared/Infographic";
import { MessagesPane } from "@/components/Messages/MessagesPane";
import {
  MutateMessageSchemaType,
  ReadMessageSchemaType,
} from "@/schemas/Message";
import { NewMessageForm } from "@/components/Messages/NewMessageForm";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";

export type MessagingProps = {
  messages: ReadMessageSchemaType[];
};
export function Messaging({ messages }: MessagingProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = routerQueryAttributeToString(router.query.user);
  const conversationId = routerQueryAttributeToString(router.query.id);

  const [messagesState, setMessagesState] = useState(messages?.reverse());
  const onSend = useCallback(
    (message: MutateMessageSchemaType) => {
      if (messagesState)
        setMessagesState([
          {
            ...message,
            conversationId: message.conversationId ?? "",
            createdAt: message.createdAt?.toLocaleDateString() ?? "",
            updatedAt: message.createdAt?.toLocaleDateString() ?? "",
            isRead: true,
          },
          ...messagesState,
        ]);
    },
    [messagesState]
  );

  return (
    <div className="flex max-h-navless flex-col">
      <div className="h-messaging p-4 shadow-inner-xl sm:h-messaging-navless">
        {messagesState.length ? (
          <MessagesPane messages={messagesState} />
        ) : (
          <Infographic message={systemMessages.INITIAL_MESSAGE} />
        )}
      </div>
      <NewMessageForm
        gender={session?.sex ?? Gender.MALE}
        recipientUsername={user}
        conversationId={conversationId}
        onSend={onSend}
      />
    </div>
  );
}
