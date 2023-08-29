"use client";

import { Conversation } from "./Conversation";
import { MessageSchemaType } from "@/schemas/Message";
import { NewMessageForm } from "./NewMessageForm";
import React, { useCallback, useState } from "react";
import state from "@/utils/user.store";

export type MessagingProps = {
  conversation: MessageSchemaType[];
  recipient: string;
};
export function Messaging({ conversation, recipient }: MessagingProps) {
  const [conversationState, setConversationState] = useState(
    conversation.reverse()
  );
  const onSend = useCallback(
    (message: MessageSchemaType) => {
      setConversationState([...conversationState, message]);
    },
    [conversationState]
  );
  return (
    <div className="flex max-h-navless min-h-navless w-full flex-col justify-between bg-background">
      <div className="flex w-full flex-col-reverse items-center overflow-y-scroll pb-4">
        <Conversation conversation={conversationState} />
      </div>
      <div className="flex w-full items-center justify-center sm:border-t">
        <NewMessageForm
          gender={state.currentUser.sex}
          recipient={recipient}
          onSend={onSend}
        />
      </div>
    </div>
  );
}
