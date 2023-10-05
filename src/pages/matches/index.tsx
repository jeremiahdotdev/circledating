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
import Layout, { LayoutNavProps, LayoutUser } from "../Layout";
import React from "react";

type ServerProps = LayoutNavProps & {
  user: LayoutUser & { userSex: Gender; userId: string };
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
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          userSex: isMale ? Gender.MALE : Gender.FEMALE,
          userId: userId,
          username: username,
        },
        preferences: preferences,
        circles: circles,
        conversations: conversations,
        actionIsUnblock: actionIsUnblock,
      } as ServerProps,
    };
  }
);
export default function Page({
  user,
  preferences,
  circles,
  conversations,
  actionIsUnblock,
}: ServerProps) {
  return (
    <Layout user={user} circles={circles} preferences={preferences}>
      {!conversations?.length ? (
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
