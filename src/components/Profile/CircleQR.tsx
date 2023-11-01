import { Logo } from "../Nav/Logo";
import { ReadCircleSchemaType } from "@/schemas/Circle";
import { Separator } from "../ui/separator";
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
          <Logo className="pb-2 pt-4" />
          <Separator />
          <p className="p-1 pl-2 font-light">
            {systemMessages.CIRCLE_BUSINESS_CARD(circle.label)}
          </p>
        </div>
      </div>
      <a className="text-purple-600 underline" href={link}>
        {link}
      </a>
    </div>
  );
}
