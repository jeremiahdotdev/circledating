"use client";

import { Gender } from "@prisma/client";
import { cn } from "@/lib/utils";
import { getOppositeSex } from "@/schemas/Gender";
import { useSession } from "next-auth/react";
import React from "react";
import ReactMarkdown from "react-markdown";

export type MessageProps = {
  timestamp: Date;
  content: string;
  isCurrentUser: boolean;
};
export function Message({ timestamp, content, isCurrentUser }: MessageProps) {
  const { data: session } = useSession();
  const sex = session?.sex;
  return (
    <div
      className={cn(
        "flex flex-col w-full",
        isCurrentUser ? "items-end" : "items-start"
      )}
    >
      <h1
        className={cn(
          "px-12",
          (isCurrentUser ? sex : getOppositeSex(sex)) == Gender.MALE
            ? "text-cyan-400"
            : "text-fuchsia-400"
        )}
      >
        {timestamp.toLocaleString()}
      </h1>
      <div
        className={cn(
          "w-3/4 rounded-3xl border px-12 py-6 text-sm ring-offset-background",
          (isCurrentUser ? session?.sex : getOppositeSex(sex)) == Gender.MALE
            ? "bg-cyan-200"
            : "bg-fuchsia-200"
        )}
      >
        <ReactMarkdown className="prose lg:prose-xl text-lg">
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
