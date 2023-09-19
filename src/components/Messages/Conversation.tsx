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
  onAction: (conversation: ConversationSchemaType) => Promise<void> | undefined;
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
      return onAction(conversation);
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
          src="https://res.cloudinary.com/dqpbm3xll/image/upload/v1694616299/samples/smile.jpg"
          fallback={usernames.substring(0, 1)}
          alt={usernames}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row items-center">
          <RouteOptionLink
            option={routes.profileByUsername(usernames)}
            onClick={stopPropagation}
          >
            <h2 className="text-xl font-semibold hover:underline">
              {usernames}
            </h2>
          </RouteOptionLink>
        </div>
        <p className="text-gray-400">{messagePreview}</p>
      </div>
      <IconButton
        variant={
          actionIsUnblock ? IconButtonVariant.LIKE : IconButtonVariant.TRASH
        }
        labelOverride={actionIsUnblock ? "Unblock" : "Unmatch"}
        className={"h-12 w-12 p-3"}
        action={takeAction}
      />
    </div>
  );
}
