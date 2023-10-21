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
        images[next],
        "flex h-navless w-screen items-end justify-end bg-cover"
      )}
    >
      {children}
    </div>
  );
}
