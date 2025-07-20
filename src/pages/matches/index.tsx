import { ConversationsView } from "@/views/ConversationView/ConversationsView";
import { Gender } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { Infographic } from "@/components/Shared/Infographic";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { UserSlice, setUser } from "@/store/userSlice";
import { appRouter } from "@/server/api/root";
import { getPrismaContext } from "@/helpers/getPrismaContext";
import { requireUser } from "@/helpers/requireUser";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type MatchesServerProps = {
  user: UserSlice & { userSex: Gender; userId: string };
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
      { userId, isActive, isMale, username, notifications },
      { preferences, circles },
      conversations,
    ] = await Promise.all([
      caller.users.stats(),
      caller.preferences.read(),
      getConversations(),
    ]);

    // I should move this logic into the required user function, or move the required user call out to this function
    return {
      props: {
        user: {
          isAuthed: !!ctx.session,
          isActive: isActive,
          notifications: notifications,
          username: username,
          preferences: preferences,
          circles: circles,
          userSex: isMale ? Gender.MALE : Gender.FEMALE,
          userId: userId,
        },
        conversations: conversations,
        actionIsUnblock: actionIsUnblock,
      } as MatchesServerProps,
    };
  }
);
export default function Page({
  user,
  conversations,
  actionIsUnblock,
}: MatchesServerProps) {
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <Layout>
      {conversations?.length && user ? (
        <ConversationsView
          conversations={conversations}
          userId={user.userId}
          userSex={user.userSex}
          actionIsUnblock={actionIsUnblock}
        />
      ) : (
        <Infographic message={systemMessages.NO_MATCHES} />
      )}
    </Layout>
  );
}
