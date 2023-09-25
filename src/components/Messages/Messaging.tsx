"use client";

import { Gender } from "@prisma/client";
import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "@/components/Messages/MessagesPane";
import { NewMessageForm } from "@/components/Messages/NewMessageForm";
import { PageNotFound } from "@/components/Shared/PageNotFound";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";

export type MessagingProps = {
  messages: MessageSchemaType[];
};
export function Messaging({ messages }: MessagingProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = routerQueryAttributeToString(router.query.user);
  const conversationId = routerQueryAttributeToString(router.query.id);

  const [messagesState, setMessagesState] = useState(messages?.reverse());
  const onSend = useCallback(
    (message: MessageSchemaType) => {
      if (messagesState) setMessagesState([message, ...messagesState]);
    },
    [messagesState]
  );

  return (
    <div className="flex max-h-navless flex-col">
      <div className="h-messaging p-4 shadow-inner-xl sm:h-messaging-navless">
        {messagesState.length ? (
          <MessagesPane messages={messagesState} />
        ) : (
          <PageNotFound error={systemMessages.INITIAL_MESSAGE} />
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
