import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleError } from "@/utils/handleError";
import React, { useState } from "react";
import classNames from "classnames";

export type ProfilePictureProps = {
  fallback: string;
  alt: string;
  src?: string;
  className?: string;
};

export function ProfilePicture({
  fallback,
  alt,
  src,
  className,
}: ProfilePictureProps) {
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
    <div className="flex aspect-square min-w-fit justify-around rounded-full bg-gradient-to-r from-fuchsia-400 from-40% to-cyan-400 to-60% bg-contain bg-no-repeat p-1 shadow-outter">
      <Avatar
        className={classNames(
          "min-w-[150px] max-w-screen-sm shadow-inner-xl aspect-square",
          className
        )}
      >
        <AvatarImage src={image ?? ""} alt={alt} className="object-cover" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </div>
  );
}
