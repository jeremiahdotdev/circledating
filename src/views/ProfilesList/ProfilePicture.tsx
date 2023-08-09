import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export type ProfilePictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ProfilePicture({ fallback, alt, src }: ProfilePictureProps) {
  return (
    <div className="flex aspect-square w-3/4 justify-around rounded-full bg-circle-pattern p-4 sm:p-1">
      <Avatar className="aspect-square sm:h-32 sm:w-32 sm:p-0">
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
