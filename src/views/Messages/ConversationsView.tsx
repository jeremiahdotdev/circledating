import {
  ConversationSchemaType,
  ReadConversationsSchemaType,
} from "@/schemas/Conversation";
import { ConversationsList } from "./ConversationsList";
import { Loading } from "@/components/nav/loading";
import { MessageSchemaType } from "@/schemas/Message";
import { MessagesPane } from "./MessagesPane";
import { NewMessageForm } from "./NewMessageForm";
import { PageNotFound } from "@/components/nav/pageNotFound";
import { api } from "@/utils/api";
import { memo, useCallback, useState } from "react";
import React from "react";
import state from "@/utils/user.store";

export type ConversationsViewProps = Record<never, never>;

export const ConversationsView: React.FC<ConversationsViewProps> = memo(() => {
  const [conversationState, setConversationState] = useState(
    {} as ConversationSchemaType
  );

  const handleClickConversation = useCallback(
    (conversation: ConversationSchemaType) => {
      setConversationState(conversation);
    },
    []
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
    userId: state.currentUser.userId,
  };
  const result = api.conversations.read.useQuery(options).data;

  if (!result?.success) return <Loading />;
  if (result?.success && !result.data.length)
    return <PageNotFound error={"No matches to show yet."} />;

  return (
    <main>
      <div className="lg:invisible lg:h-0 lg:w-0">
        <ConversationsList conversations={result.data} />
      </div>
      <div className="invisible flex h-0 w-0 lg:visible lg:min-h-navless lg:w-full">
        <div className="md:w-1/4 ">
          <ConversationsList
            conversations={result.data}
            onClick={handleClickConversation}
          />
        </div>
        <div className="flex h-full w-3/4 flex-col">
          <div className="h-full p-4 shadow-inner-xl">
            <MessagesPane messages={conversationState.messages} />
          </div>
          <NewMessageForm
            gender={state.currentUser.sex}
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
    </main>
  );
});
