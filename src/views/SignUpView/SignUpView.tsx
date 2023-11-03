import { SignUp } from "@/components/SignUp/SignUp";
import { SlideShow } from "@/components/Shared/SlideShow";
import { banners } from "@/globals/banners";
import { memo } from "react";
import { shuffle } from "@/helpers/shuffle";
import React from "react";

export type SignUpViewProps = Record<never, never>;

export const SignUpView: React.FC<SignUpViewProps> = memo(() => {
  return (
    <SlideShow images={shuffle(banners)}>
      <div className="flex max-h-navless min-h-window w-full flex-col items-center justify-center bg-cover">
        <SignUp />
      </div>
    </SlideShow>
  );
});
