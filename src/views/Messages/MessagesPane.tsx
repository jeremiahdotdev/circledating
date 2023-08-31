"use client";

import { Message } from "./Message";
import { MessageSchemaType } from "@/schemas/Message";
import React from "react";
import state from "@/utils/user.store";

export type MessagesPaneProps = {
  messages?: MessageSchemaType[];
};
export function MessagesPane({ messages }: MessagesPaneProps) {
  return (
    <div className="flex h-full max-h-navless w-full flex-col-reverse">
      {messages?.map(
        ({ createdAt, content, recipientUsername, authorUsername }, index) => {
          return (
            <Message
              key={`${authorUsername}-${recipientUsername}-${index}`}
              timestamp={createdAt ?? new Date()}
              content={content}
              isCurrentUser={authorUsername === state.currentUser.username}
            />
          );
        }
      )}
    </div>
  );
}
