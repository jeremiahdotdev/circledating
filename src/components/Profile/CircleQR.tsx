import { ReadCircleSchemaType } from "@/schemas/Circle";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useQRCode } from "next-qrcode";
import React from "react";

export type CircleQRProps = {
  circle: ReadCircleSchemaType;
};
export default function CircleQR({ circle }: CircleQRProps) {
  const { Canvas } = useQRCode();
  const link = routes.shareCircle(circle.code ?? "");
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full">
        <div className="flex w-2/5 flex-col items-center">
          <Canvas
            text={link ?? ""}
            logo={{ src: "/logo.svg", options: { width: 60 } }}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 5,
              width: 150,
              color: {
                dark: "#000000",
                light: "#FFFFFF",
              },
            }}
          />
        </div>
        <div className="flex w-3/5 flex-col items-center pl-4">
          <h3 className="text-xl">{circle.label}</h3>
          <p className="font-light">{systemMessages.CIRCLE_BUSINESS_CARD}</p>
        </div>
      </div>
      <a className="text-purple-600 underline" href={link}>
        {link}
      </a>
    </div>
  );
}
