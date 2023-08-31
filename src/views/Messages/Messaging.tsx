"use client";

import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "./MessagesPane";
import { NewMessageForm } from "./NewMessageForm";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type MessagingProps = {
  messages?: MessageSchemaType[];
  recipientUsername?: string;
  conversationId?: string;
};
export function Messaging({
  messages,
  recipientUsername,
  conversationId,
}: MessagingProps) {
  const [messagesState, setMessagesState] = useState(messages?.reverse());
  const onSend = useCallback(
    (message: MessageSchemaType) => {
      if (messagesState) setMessagesState([message, ...messagesState]);
    },
    [messagesState]
  );

  return (
    <div className="flex flex-col">
      <div className="h-full p-4 shadow-inner-xl">
        <MessagesPane messages={messagesState} />
      </div>
      <NewMessageForm
        gender={state.currentUser.sex}
        recipientUsername={recipientUsername}
        conversationId={conversationId}
        onSend={onSend}
      />
    </div>
  );
}
