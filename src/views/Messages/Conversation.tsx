"use client";

import { ConversationPicture } from "./ConversationPicture";
import { ConversationSchemaType } from "@/schemas/Conversation";
import { IconButton, IconButtonVariant } from "@/schemas/IconButton";
import Link from "next/link";
import React, { useCallback } from "react";
import state from "@/utils/user.store";

export type ConversationProps = {
  conversation: ConversationSchemaType;
  onClick?: (conversation: ConversationSchemaType) => void;
};
export function Conversation({ conversation, onClick }: ConversationProps) {
  const usernames = conversation.users
    ?.filter((user) => user.id !== state.currentUser.userId)
    ?.map((user) => user.username)
    ?.join(",");
  const newestMessage = conversation.messages?.[0];
  const messagePreview = newestMessage
    ? `${newestMessage?.authorUsername}: ${
        newestMessage.content.length > 30
          ? `${newestMessage.content.substring(0, 30)}...`
          : newestMessage.content
      }`
    : "Start talking!";

  const handleClick = useCallback(() => {
    if (onClick) onClick(conversation);
  }, [onClick, conversation]);
  return (
    <Link href={onClick ? "#" : `/messages/${usernames}`} onClick={handleClick}>
      <div className="grid w-full grid-cols-4 items-center gap-2 px-4 py-2 shadow-outter first:mt-0.5 hover:shadow-outter-xl">
        <div className="h-16 w-16">
          <ConversationPicture
            // TODO: Replace with actual picture.
            src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
            fallback={usernames.substring(0, 1)}
            alt={usernames}
          />
        </div>
        <div className="col-span-2 w-full">
          <h2 className="text-xl font-semibold">{usernames}</h2>
          <p className="text-gray-400">{messagePreview}</p>
        </div>
        <div className="flex gap-2">
          <IconButton variant={IconButtonVariant.LIKE} label={"Like!"} />
          <IconButton
            variant={IconButtonVariant.TRASH}
            label={"Hide this user"}
          />
        </div>
      </div>
    </Link>
  );
}
