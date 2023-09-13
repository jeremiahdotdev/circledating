import { memo } from "react";
import React from "react";

export type NewCircleViewProps = Record<never, never>;

export const NewCircleView: React.FC<NewCircleViewProps> = memo(() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between"></main>
  );
});
