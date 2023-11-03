import { Infographic } from "@/components/Shared/Infographic";
import { Loading } from "@/components/Shared/Loading";
import { Messaging } from "../../components/Messages/Messaging";
import { api } from "@/utils/api";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";

export type MessagesViewProps = Record<never, never>;

export const MessagesView: React.FC<MessagesViewProps> = memo(() => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = routerQueryAttributeToString(router.query.user);
  if (!user) return <Infographic />;

  const request = api.messages.read.useQuery({
    authorUsername: session?.user?.name ?? "",
    recipientUsername: user,
  });
  if (!request.data) return <Loading />;

  const messages = request.data;

  return <Messaging messages={messages} />;
});
