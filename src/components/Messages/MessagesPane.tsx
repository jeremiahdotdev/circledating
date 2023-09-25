"use client";

import { Message } from "./Message";
import { MessageSchemaType } from "@/schemas/Message";
import { useSession } from "next-auth/react";
import React from "react";

export type MessagesPaneProps = {
  messages?: MessageSchemaType[];
};
export function MessagesPane({ messages }: MessagesPaneProps) {
  const { data: session } = useSession();
  return (
    <div className="flex h-full max-h-navless w-full flex-1 flex-col-reverse">
      {messages?.map(
        ({ createdAt, content, recipientUsername, authorUsername }, index) => {
          return (
            <Message
              key={`${authorUsername}-${recipientUsername}-${index}`}
              timestamp={createdAt ?? new Date()}
              content={content}
              isCurrentUser={authorUsername === session?.user?.name}
            />
          );
        }
      )}
    </div>
  );
}
