import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleError } from "@/utils/handleError";
import React, { useState } from "react";

export type ListItemPictureProps = {
  fallback: string;
  alt: string;
  src?: string;
};

export function ListItemPicture({ fallback, alt, src }: ListItemPictureProps) {
  const [image, setImage] = useState("");

  if (src)
    fetch(src, {
      method: "GET",
    })
      .then(async (response) => {
        const newImage = await response.text();
        setImage(newImage);
      })
      .catch(handleError);

  return (
    <div className="flex aspect-square min-w-fit justify-around rounded-full bg-gray-400 bg-contain bg-no-repeat p-0.5">
      <Avatar className="aspect-square min-w-[40px] shadow-outter">
        <AvatarImage src={image ?? ""} alt={alt} className="object-cover" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
