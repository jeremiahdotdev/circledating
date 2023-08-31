"use client";

import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "./MessagesPane";
import { NewMessageForm } from "./NewMessageForm";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
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
    <div className="flex flex-col">
      <div className="h-messaging p-4 shadow-inner-xl">
        <MessagesPane messages={messagesState} />
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
