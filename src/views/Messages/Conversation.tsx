"use client";

import { ConversationPicture } from "./ConversationPicture";
import { ConversationSchemaType } from "@/schemas/Conversation";
import { IconButton, IconButtonVariant } from "@/schemas/IconButton";
import React, { useCallback } from "react";
import state from "@/utils/user.store";

export type ConversationProps = {
  conversation: ConversationSchemaType;
  onSelect: (conversation: ConversationSchemaType) => void;
  onAction: (conversation: ConversationSchemaType) => void;
  actionIsUnblock?: boolean;
};
export function Conversation({
  conversation,
  actionIsUnblock,
  onSelect,
  onAction,
}: ConversationProps) {
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
    onSelect(conversation);
  }, [onSelect, conversation]);

  const takeAction = useCallback(
    (click: React.MouseEvent<HTMLButtonElement>) => {
      click.stopPropagation();
      onAction(conversation);
    },
    [onAction, conversation]
  );

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2 shadow-outter first:mt-0.5 hover:shadow-outter-xl"
    >
      <div className="aspect-square h-16 w-16">
        <ConversationPicture
          // TODO: Replace with actual picture.
          src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
          fallback={usernames.substring(0, 1)}
          alt={usernames}
        />
      </div>
      <div className="w-full">
        <h2 className="text-xl font-semibold">{usernames}</h2>
        <p className="text-gray-400">{messagePreview}</p>
      </div>
      <IconButton
        variant={
          actionIsUnblock ? IconButtonVariant.LIKE : IconButtonVariant.TRASH
        }
        label={actionIsUnblock ? "Unblock" : "Unmatch"}
        onClick={takeAction}
      />
    </div>
  );
}
