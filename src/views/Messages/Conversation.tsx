"use client";

import { Message } from "./Message";
import { MessageSchemaType } from "@/schemas/Message";
import { getOppositeSex } from "@/schemas/Gender";
import React from "react";
import state from "@/utils/user.store";

export type ConversationProps = {
  conversation: MessageSchemaType[];
};
export function Conversation({ conversation }: ConversationProps) {
  return (
    <div className="flex flex-col sm:w-3/4">
      {conversation.map(({ createdAt, content, authorUsername }, index) => (
        <Message
          key={`${authorUsername}-${index}`}
          timestamp={createdAt}
          content={content}
          gender={
            authorUsername == state.currentUser.username
              ? state.currentUser.sex
              : getOppositeSex(state.currentUser.sex)
          }
          isCurrentUser={authorUsername == state.currentUser.username}
        />
      ))}
    </div>
  );
}
