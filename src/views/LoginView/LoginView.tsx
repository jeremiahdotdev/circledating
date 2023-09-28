import { Login } from "@/components/Login/Login";
import React, { memo } from "react";

export type LoginViewProps = Record<never, never>;

export const LoginView: React.FC<LoginViewProps> = memo(() => {
  return (
    <div className="min-h-window flex max-h-navless w-full flex-col items-center justify-center bg-church-sample bg-cover">
      <Login />
    </div>
  );
});
