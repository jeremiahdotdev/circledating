import { ContactForm } from "@/components/Help/ContactForm";
import { memo } from "react";
import React from "react";

export type HelpProps = Record<never, never>;

export const HelpView: React.FC<HelpProps> = memo(() => {
  return (
<<<<<<< Updated upstream
    <main className="flex min-h-screen flex-col gap-8 p-40">
      <p>Have a question? Need some help?</p>
      <p>Email us at admin@email.com</p>
=======
    <main className="flex min-h-window flex-col items-center justify-center p-2">
      <ContactForm />
>>>>>>> Stashed changes
    </main>
  );
});
