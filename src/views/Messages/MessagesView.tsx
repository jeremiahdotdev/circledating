import { Messaging } from "./Messaging";
import { MessagingOptions } from "child_process";
import { PageNotFound } from "@/components/nav/pageNotFound";
import { memo } from "react";
import { useRouter } from "next/router";
import React from "react";

export type MessagesViewProps = Record<never, never>;

export const MessagesView: React.FC<MessagingOptions> = memo(() => {
  const router = useRouter();
  const user = router.query.user;
  return (
    <main className="flex min-h-navless flex-col items-center justify-between">
      {user ? <Messaging /> : <PageNotFound />}
    </main>
  );
});
