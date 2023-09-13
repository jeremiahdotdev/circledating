"use client";

import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "@/components/Messages/MessagesPane";
import { NewMessageForm } from "@/components/Messages/NewMessageForm";
import { PageNotFound } from "@/components/Shared/PageNotFound";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type MessagingProps = {
  messages: MessageSchemaType[];
};
export function Messaging({ messages }: MessagingProps) {
  const router = useRouter();
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
      <div className="h-messaging p-4 shadow-inner-xl">
        {messagesState.length ? (
          <MessagesPane messages={messagesState} />
        ) : (
          <PageNotFound error={systemMessages.INITIAL_MESSAGE} />
        )}
      </div>
      <NewMessageForm
        gender={state.currentUser.sex}
        recipientUsername={user}
        conversationId={conversationId}
        onSend={onSend}
      />
    </div>
  );
}
