import { memo } from "react";
import React from "react";

export type TermsAndConditionsViewProps = Record<never, never>;

export const TermsAndConditionsView: React.FC<TermsAndConditionsViewProps> =
  memo(() => {
    return (
      <div className="lex-col min-h-window flex items-center justify-between p-40">
        Terms and Conditions
      </div>
    );
  });
