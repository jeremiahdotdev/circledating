import { NewCircle } from "@/components/NewCircle/NewCircle";
import { memo } from "react";
import React from "react";

export type NewCircleViewProps = Record<never, never>;

export const NewCircleView: React.FC<NewCircleViewProps> = memo(() => {
  return <NewCircle />;
});
