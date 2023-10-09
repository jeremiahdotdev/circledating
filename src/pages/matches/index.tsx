import { ConversationsView } from "@/views/ConversationView/ConversationsView";
import { Gender } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { PageNotFound } from "@/components/Shared/PageNotFound";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import Layout, { LayoutProps } from "../Layout";
import React from "react";

type ServerProps = LayoutProps & {
  user: { userSex: Gender; userId: string };
  conversations: ReadConversationSchemaType[];
  actionIsUnblock: boolean;
};

export const getServerSideProps = requireUser(
  async (_ctx: GetServerSidePropsContext) => {
    const { ctx } = await getPrismaContext(_ctx);
    const caller = appRouter.createCaller(ctx);
    const actionIsUnblock = !!routerQueryAttributeToString(_ctx.query.blocked);

    const getConversations = actionIsUnblock
      ? caller.conversations.readDeleted
      : caller.conversations.read;

    const [
      { userId, isActive, isMale, username },
      { preferences, circles },
      conversations,
    ] = await Promise.all([
      caller.users.stats(),
      caller.preferences.read(),
      getConversations(),
    ]);

    return {
      props: {
        nav: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          username: username,
          preferences: preferences,
          circles: circles,
        },
        user: {
          userSex: isMale ? Gender.MALE : Gender.FEMALE,
          userId: userId,
        },
        conversations: conversations,
        actionIsUnblock: actionIsUnblock,
      } as ServerProps,
    };
  }
);
export default function Page({
  nav,
  user,
  conversations,
  actionIsUnblock,
}: ServerProps) {
  return (
    <Layout nav={nav}>
      {!conversations?.length && user ? (
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
