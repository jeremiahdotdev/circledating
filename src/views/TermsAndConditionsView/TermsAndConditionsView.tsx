import { memo } from "react";
import { termsAndConditions } from "@/globals/terms-and-conditions";
import React from "react";

export type TermsAndConditionsViewProps = Record<never, never>;

export const TermsAndConditionsView: React.FC<TermsAndConditionsViewProps> =
  memo(() => {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-40">
        {termsAndConditions}
      </main>
    );
  });
