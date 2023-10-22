import { useQRCode } from "next-qrcode";
import React from "react";

export type ProfileQRProps = {
  url: string;
};
export default function ProfileQR({ url }: ProfileQRProps) {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={url}
      logo={{ src: "/logo.svg", options: { width: 90 } }}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }}
    />
  );
}
