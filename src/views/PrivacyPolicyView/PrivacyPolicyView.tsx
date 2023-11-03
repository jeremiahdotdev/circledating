import { memo } from "react";
import { privacyPolicy } from "@/globals/privacy-policy";
import React from "react";

export type PrivacyPolicyViewProps = Record<never, never>;

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      {privacyPolicy}
    </main>
  );
});
