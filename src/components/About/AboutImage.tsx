import Image from "next/image";
import React from "react";
import classNames from "classnames";

export type AboutSectionProps = {
  image: string;
  className?: string;
};

export function AboutImage({ image, className }: AboutSectionProps) {
  return (
    <div className="relative aspect-square  flex-1 rounded-lg border bg-white p-8 shadow">
      <div className="absolute -inset-2 -z-50 rounded-lg bg-fuchsia-100 opacity-75 blur" />
      <Image
        objectFit="cover"
        alt=""
        src={image}
        fill={true}
        className={classNames(
          className,
          image,
          "aspect-square rounded shadow-inner p-8"
        )}
      />
    </div>
  );
}
