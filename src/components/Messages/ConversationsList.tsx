"use client";

import { Conversation } from "./Conversation";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { api } from "@/utils/api";
import React, { useCallback, useMemo, useState } from "react";

export type ConversationsListProps = {
  conversations: ReadConversationSchemaType[];
  actionIsUnblock?: boolean;
  onSelect: (conversation: ReadConversationSchemaType) => void;
};
export function ConversationsList({
  conversations,
  actionIsUnblock,
  onSelect,
}: ConversationsListProps) {
  const { mutateAsync } = actionIsUnblock
    ? api.conversations.unDelete.useMutation()
    : api.conversations.softDelete.useMutation();
  api.conversations.softDelete.useMutation();

  const [conversationsState, setConversationsState] = useState(conversations);
  const onAction = useCallback(
    (conversation: ReadConversationSchemaType) => {
      if (conversation.id)
        return mutateAsync(conversation.id).then(() => {
          setConversationsState((oldValue) =>
            oldValue.filter((c) => c.id !== conversation.id)
          );
        });
    },
    [mutateAsync]
  );

  const renderedConversations = useMemo(() => {
    if (conversationsState) {
      return conversationsState?.map((conversation) => {
        return (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            actionIsUnblock={actionIsUnblock}
            onSelect={onSelect}
            onAction={onAction}
          />
        );
      });
    } else {
      return <></>;
    }
  }, [conversationsState, onSelect, onAction, actionIsUnblock]);

  return <div className="flex flex-col">{renderedConversations}</div>;
}
