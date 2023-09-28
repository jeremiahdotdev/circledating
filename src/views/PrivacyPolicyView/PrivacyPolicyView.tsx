import { memo } from "react";
import React from "react";

export type PrivacyPolicyViewProps = Record<never, never>;

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = memo(() => {
  return (
    <main className="flex min-h-window flex-col items-center justify-between p-40">
      Privacy Policy
    </main>
  );
});
