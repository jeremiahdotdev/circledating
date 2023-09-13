import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export type ListItemPictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ListItemPicture({ fallback, alt, src }: ListItemPictureProps) {
  return (
    <div className="flex aspect-square min-w-fit justify-around rounded-full bg-gray-400 bg-contain bg-no-repeat p-0.5">
      <Avatar className="aspect-square min-w-[40px]">
        <AvatarImage src={src} alt={alt} className="object-cover" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
