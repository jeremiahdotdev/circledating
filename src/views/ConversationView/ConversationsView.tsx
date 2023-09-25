import {
  ConversationSchemaType,
  ReadConversationsSchemaType,
} from "@/schemas/Conversation";
import { ConversationsList } from "../../components/Messages/ConversationsList";
import { Gender } from "@prisma/client";
import { Loading } from "@/components/Shared/Loading";
import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "../../components/Messages/MessagesPane";
import { NewMessageForm } from "../../components/Messages/NewMessageForm";
import { PageNotFound } from "@/components/Shared/PageNotFound";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useState } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";

export type ConversationsViewProps = Record<never, never>;

export const ConversationsView: React.FC<ConversationsViewProps> = memo(() => {
  const router = useRouter();
  const { data: session } = useSession();
  const actionIsUnblock = !!routerQueryAttributeToString(router.query.blocked);
  const [conversationState, setConversationState] = useState(
    {} as ConversationSchemaType
  );
  const handleSelectConversation = useCallback(
    (conversation: ConversationSchemaType) => {
      setConversationState(conversation);
    },
    []
  );
  const handleRoute = useCallback(
    (conversation: ConversationSchemaType) => {
      const usernames = conversation.users
        ?.filter((user) => user.id !== session?.id)
        ?.map((user) => user.username)
        ?.join(",");
      router.push(routes.messagesByUsername(usernames).href).catch(handleError);
    },
    [router, session]
  );

  const onSend = useCallback(
    (message: MessageSchemaType) => {
      setConversationState({
        id: conversationState.id,
        messages: [message, ...conversationState.messages],
        users: conversationState.users,
      });
    },
    [conversationState]
  );

  const options: ReadConversationsSchemaType = {
    userId: session?.id ?? "",
  };

  const result = actionIsUnblock
    ? api.conversations.readDeleted.useQuery(options).data
    : api.conversations.read.useQuery(options).data;

  if (!result?.success) return <Loading />;
  if (result?.success && !result.data.length)
    return <PageNotFound error={systemMessages.NO_MATCHES} />;

  return (
    <div>
      <div className="lg:invisible lg:h-0 lg:w-0">
        <ConversationsList
          conversations={result.data}
          onSelect={handleRoute}
          actionIsUnblock={actionIsUnblock}
        />
      </div>
      <div className="invisible flex h-0 w-0 lg:visible lg:min-h-navless lg:w-full">
        <div className="md:w-1/4 ">
          <ConversationsList
            conversations={result.data}
            actionIsUnblock={actionIsUnblock}
            onSelect={handleSelectConversation}
          />
        </div>
        <div className="flex h-full w-3/4 flex-col">
          <div className="h-full p-4 shadow-inner-xl">
            <MessagesPane messages={conversationState.messages} />
          </div>
          <NewMessageForm
            gender={session?.sex ?? Gender.MALE}
            recipientUsername={
              conversationState?.users?.find(
                (user) => user.id != options.userId
              )?.username
            }
            conversationId={conversationState?.id}
            onSend={onSend}
          />
        </div>
      </div>
    </div>
  );
});
