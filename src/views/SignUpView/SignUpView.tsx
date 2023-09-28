import { SignUp } from "@/components/SignUp/SignUp";
import { memo } from "react";
import React from "react";

export type SignUpViewProps = Record<never, never>;

export const SignUpView: React.FC<SignUpViewProps> = memo(() => {
  return (
    <div className="min-h-window flex max-h-navless w-full flex-col items-center justify-center bg-church-sample bg-cover">
      <SignUp />
    </div>
  );
});
