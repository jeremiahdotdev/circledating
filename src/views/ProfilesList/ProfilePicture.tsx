import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export type ProfilePictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ProfilePicture({ fallback, alt, src }: ProfilePictureProps) {
  return (
    <Avatar className="h-32 w-32">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
