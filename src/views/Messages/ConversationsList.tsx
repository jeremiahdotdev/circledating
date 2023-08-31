"use client";

import { Conversation } from "./Conversation";
import { ConversationSchemaType } from "@/schemas/Conversation";
import React, { useMemo } from "react";

export type ConversationsListProps = {
  conversations: ConversationSchemaType[];
  onClick?: (conversation: ConversationSchemaType) => void;
};
export function ConversationsList({
  conversations,
  onClick,
}: ConversationsListProps) {
  const renderedConversations = useMemo(() => {
    if (conversations) {
      return conversations?.map((conversation) => {
        return (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            onClick={onClick}
          />
        );
      });
    } else {
      return <></>;
    }
  }, [conversations, onClick]);

  return <div className="flex flex-col">{renderedConversations}</div>;
}
