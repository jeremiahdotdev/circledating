import Image from "next/image";
import React, { useState } from "react";
import classNames from "classnames";

export type SlideShowProps = {
  images: string[];
  children: React.ReactNode;
};

export function SlideShow({ images, children }: SlideShowProps) {
  const [next, setNext] = useState(0);
  setTimeout(
    () => setNext((v) => (v >= images.length - 1 ? 0 : v + 1)),
    60 * 1000
  );
  return (
    <div
      className={classNames(
        "relative h-navless w-full items-end justify-end bg-cover"
      )}
    >
      <div className="absolute -z-50 h-screen w-full">
        <Image objectFit="cover" alt="" src={images[next]} fill={true} />
      </div>
      {children}
    </div>
  );
}
