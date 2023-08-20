"use client";

import { Gender } from "@prisma/client";
import { cn } from "@/lib/utils";
import React from "react";

export type MessageProps = {
  timestamp: Date;
  gender: Gender;
  content: string;
  isCurrentUser: boolean;
};
export function Message({
  timestamp,
  gender,
  content,
  isCurrentUser,
}: MessageProps) {
  return (
    <div
      className={cn(
        "flex flex-col w-full sm:pt-6",
        isCurrentUser ? "items-end" : "items-start"
      )}
    >
      <h1
        className={cn(
          "px-12 flex",
          gender == Gender.MALE ? "text-cyan-400" : "text-fuchsia-400"
        )}
      >
        {timestamp.toLocaleString()}
      </h1>
      <div
        className={cn(
          "py-6 px-12 flex rounded-full border flex-col h-full w-3/4 flex-wrap text-sm ring-offset-background sm:justify-between",
          gender == Gender.MALE ? "bg-cyan-200" : "bg-fuchsia-200"
        )}
      >
        <p className="text-lg">{content}</p>
      </div>
    </div>
  );
}
