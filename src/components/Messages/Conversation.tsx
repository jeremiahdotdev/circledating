"use client";

import { ConversationSchemaType } from "@/schemas/Conversation";
import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import { ListItemPicture } from "../ui/ListItemPicture";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { routes } from "@/globals/routes";
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

  const stopPropagation = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => event.stopPropagation(),
    []
  );
  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2 shadow-outter first:mt-0.5 hover:shadow-outter-xl"
    >
      <div className="aspect-square h-16 w-16">
        <ListItemPicture
          // TODO: Replace with actual picture.
          src="https://images.unsplash.com/photo-1542596768-5d1d21f1cf98"
          fallback={usernames.substring(0, 1)}
          alt={usernames}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center">
          <h2 className="text-xl font-semibold">{usernames}</h2>
          <RouteOptionLink
            option={routes.profileByUsername(usernames)}
            onClick={stopPropagation}
          >
            <i className="px-2 underline">(See profile)</i>
          </RouteOptionLink>
        </div>
        <p className="text-gray-400">{messagePreview}</p>
      </div>
      <IconButton
        variant={
          actionIsUnblock ? IconButtonVariant.LIKE : IconButtonVariant.TRASH
        }
        labelOverride={actionIsUnblock ? "Unblock" : "Unmatch"}
        onClick={takeAction}
      />
    </div>
  );
}
