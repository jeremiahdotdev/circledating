"use client";

import { IconButton, IconButtonVariant } from "@/components/Shared/IconButton";
import { ListItemPicture } from "../ui/ListItemPicture";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { api } from "@/utils/api";
import { routes } from "@/globals/routes";
import { useSession } from "next-auth/react";
import React, { useCallback } from "react";

export type ConversationProps = {
  conversation: ReadConversationSchemaType;
  onSelect: (conversation: ReadConversationSchemaType) => void;
  onAction: (
    conversation: ReadConversationSchemaType
  ) => Promise<void> | undefined;
  actionIsUnblock?: boolean;
};
export function Conversation({
  conversation,
  actionIsUnblock,
  onSelect,
  onAction,
}: ConversationProps) {
  const { data: session } = useSession();
  const usernames = conversation.users
    ?.filter((user) => user.userId !== session?.id)
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

  const request = api.profiles.read.useQuery(usernames);

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
          src={request.data?.image}
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
