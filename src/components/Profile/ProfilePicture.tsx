import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export type ProfilePictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ProfilePicture({ fallback, alt, src }: ProfilePictureProps) {
  return (
    <div className="mr-1 flex aspect-square w-3/4 min-w-fit justify-around rounded-full bg-circle-pattern bg-contain bg-no-repeat p-3 sm:p-2">
      <Avatar className="m-1 aspect-square">
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
