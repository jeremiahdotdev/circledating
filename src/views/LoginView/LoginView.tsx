import { Login } from "@/components/Login/Login";
import { SlideShow } from "@/components/Shared/SlideShow";
import { banners } from "@/globals/banners";
import { shuffle } from "@/helpers/shuffle";
import React, { memo } from "react";

export type LoginViewProps = Record<never, never>;

export const LoginView: React.FC<LoginViewProps> = memo(() => {
  return (
    <SlideShow images={shuffle(banners)}>
      <div className="flex max-h-navless min-h-window w-full flex-col items-center justify-center bg-cover">
        <Login />
      </div>
    </SlideShow>
  );
});
