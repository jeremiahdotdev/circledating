import { Login } from "@/components/Login/Login";
import React, { memo } from "react";

export type LoginViewProps = Record<never, never>;

export const LoginView: React.FC<LoginViewProps> = memo(() => {
  return (
    <div className="flex max-h-navless min-h-navless w-full flex-col items-center justify-center">
      <Login />
    </div>
  );
});
