import { ConversationsView } from "@/views/ConversationView/ConversationsView";
import { Gender } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { Layout, LayoutUser } from "../Layout";
import { PageNotFound } from "@/components/Shared/PageNotFound";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import React from "react";

type ServerProps = {
  user: LayoutUser & { userSex: Gender; userId: string };
  conversations: ReadConversationSchemaType[];
  actionIsUnblock: boolean;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const profile = await caller.profiles.readCurrent();
    const actionIsUnblock = !!routerQueryAttributeToString(_ctx.query.blocked);

    const conversations = actionIsUnblock
      ? await caller.conversations.readDeleted()
      : await caller.conversations.read();

    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: !!profile,
          userSex: profile?.sex,
          userId: profile?.userId,
        },
        conversations: conversations,
        actionIsUnblock: actionIsUnblock,
      } as ServerProps,
    };
  }
);
export default function Page({
  user,
  conversations,
  actionIsUnblock,
}: ServerProps) {
  return (
    <Layout user={user}>
      {!conversations.length ? (
        <ConversationsView
          conversations={conversations}
          userId={user.userId}
          userSex={user.userSex}
          actionIsUnblock={actionIsUnblock}
        />
      ) : (
        <PageNotFound error={systemMessages.NO_MATCHES} />
      )}
    </Layout>
  );
}
