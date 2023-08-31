import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export type ConversationPictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ConversationPicture({
  fallback,
  alt,
  src,
}: ConversationPictureProps) {
  return (
    <div className="flex aspect-square min-w-fit justify-around rounded-full bg-gray-400 bg-contain bg-no-repeat p-0.5">
      <Avatar className="aspect-square">
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
