import Image from "next/image";
import React from "react";

export const getImageComponent = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={100} height={100} />
);
