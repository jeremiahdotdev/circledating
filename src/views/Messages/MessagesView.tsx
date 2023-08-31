import { Loading } from "@/components/nav/loading";
import { MessageSchemaType } from "@/schemas/Message";
import { Messaging } from "./Messaging";
import { PageNotFound } from "@/components/nav/pageNotFound";
import { api } from "@/utils/api";
import { memo } from "react";
import { useRouter } from "next/router";
import React from "react";
import state from "@/utils/user.store";

export type MessagesViewProps = Record<never, never>;

export const MessagesView: React.FC<MessagesViewProps> = memo(() => {
  const router = useRouter();
  const user = Array.isArray(router.query.user)
    ? router.query.user[0]
    : router.query.user ?? "";
  if (!user) return <PageNotFound />;

  const request = api.messages.read.useQuery({
    authorUsername: state.currentUser.username,
    recipientUsername: user,
  });
  if (!request.data) return <Loading />;

  const messages: MessageSchemaType[] = request.data;

  return (
    <main className="min-h-navless">
      <Messaging messages={messages} recipientUsername={user} />
    </main>
  );
});
