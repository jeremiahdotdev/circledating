import { ConversationsView } from "@/views/ConversationView/ConversationsView";
import { Gender } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { Infographic } from "@/components/Shared/Infographic";
import { PrismaContext } from "@/server/api/types";
import { ReadConversationSchemaType } from "@/schemas/Conversation";
import { UserSlice, setUser } from "@/store/userSlice";
import { conversationScripts } from "@/server/api/prisma/conversationScripts";
import { insistOn } from "@/helpers/insistOn";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { systemMessages } from "@/globals/systemMessages";
import { useAppDispatch } from "@/store/hooks";
import Layout from "../Layout";
import React from "react";

export type MatchesServerProps = {
  user: UserSlice;
  conversations: ReadConversationSchemaType[];
  actionIsUnblock: boolean;
};

export const getServerSideProps = insistOn(
  { user: true },
  (prisma: PrismaContext, ctx: GetServerSidePropsContext) => {
    const actionIsUnblock = !!routerQueryAttributeToString(ctx.query.blocked);

    const getActionisUnblock = async () =>
      Promise.resolve({
        actionIsUnblock: actionIsUnblock,
      });

    // Require conversations?
    return [
      getActionisUnblock(),
      actionIsUnblock
        ? conversationScripts.query.readDeleted(prisma)
        : conversationScripts.query.read(prisma),
    ];
  }
);

export default function Page({
  user,
  conversations,
  actionIsUnblock,
}: MatchesServerProps) {
  useAppDispatch()(setUser(user));
  return (
    <Layout>
      {conversations?.length && user ? (
        <ConversationsView
          conversations={conversations}
          userId={user.userId ?? ""}
          userSex={user.userSex ?? Gender.FEMALE}
          actionIsUnblock={actionIsUnblock}
        />
      ) : (
        <Infographic message={systemMessages.NO_MATCHES} />
      )}
    </Layout>
  );
}
