import { ContactForm } from "@/components/Help/ContactForm";
import { memo } from "react";
import React from "react";

export type HelpProps = Record<never, never>;

export const HelpView: React.FC<HelpProps> = memo(() => {
  return (
    <main className="min-h-window flex flex-col items-center justify-center p-2">
      <ContactForm />
    </main>
  );
});
