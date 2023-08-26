"use client";

import { Message } from "./Message";
import { MessageSchemaType } from "@/schemas/Message";
import { NewMessageBar } from "./NewMessageBar";
import { getOppositeSex } from "@/schemas/Gender";
import React from "react";
import state from "@/utils/user.store";

export type MessagingProps = {
  conversation: MessageSchemaType[];
};
export function Messaging({ conversation }: MessagingProps) {
  return (
    <div className="flex max-h-navless min-h-navless w-full flex-col justify-between bg-background p-3 ">
      <div className="flex w-full items-center justify-center self-center overflow-y-scroll">
        <div className="flex flex-col-reverse sm:w-3/4">
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
      </div>
      <NewMessageBar />
    </div>
  );
}
