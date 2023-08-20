"use client";

import { Message } from "./Message";
import { NewMessageBar } from "./NewMessageBar";
import React from "react";
import state from "@/utils/user.store";

export function Messaging() {
  // TODO: Replace with user from cache.
  const recipient = profiles[1];
  const conversation = [
    {
      author: recipient.username,
      recipient: state.currentUser.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: state.currentUser.username,
      recipient: recipient.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: recipient.username,
      recipient: state.currentUser.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: recipient.username,
      recipient: state.currentUser.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: state.currentUser.username,
      recipient: recipient.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: recipient.username,
      recipient: state.currentUser.username,
      timestamp: new Date(),
      content: "Hello",
    },
    {
      author: state.currentUser.username,
      recipient: recipient.username,
      timestamp: new Date(),
      content: "Hello",
    },
  ];
  return (
    <div className="flex max-h-navless min-h-navless w-full flex-col justify-between bg-background p-3 ">
      <div className="flex w-full items-center justify-center self-center overflow-y-scroll">
        <div className="flex flex-col-reverse sm:w-3/4">
          {conversation.map(({ timestamp, content, author }, index) => (
            <Message
              key={`${author}-${index}`}
              timestamp={timestamp}
              content={content}
              gender={
                author == state.currentUser.username
                  ? state.currentUser.sex
                  : recipient.sex
              }
              isCurrentUser={author == state.currentUser.username}
            />
          ))}
        </div>
      </div>
      <NewMessageBar />
    </div>
  );
}
