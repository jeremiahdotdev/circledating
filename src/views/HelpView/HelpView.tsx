import { memo } from "react";
import React from "react";

export type HelpProps = Record<never, never>;

export const HelpView: React.FC<HelpProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-40">
      <p>Have a question? Need some help?</p>
      <p>Email us at admin@email.com</p>
    </main>
  );
});
