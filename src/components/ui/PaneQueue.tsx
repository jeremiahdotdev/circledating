import { IconButton } from "../Shared/IconButton";
import { IconButtonVariant } from "@/schemas/Button";
import { memo, useCallback, useMemo, useState } from "react";
import React from "react";

export type PaneQueueProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const PaneQueue = memo(({ children }: PaneQueueProps) => {
  const panes = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );
  const [currentPaneIndex, setCurrentPaneIndex] = useState(0);
  const nextPane = useCallback(
    () =>
      setCurrentPaneIndex((oldValue) =>
        oldValue < panes.length - 1 ? oldValue + 1 : 0
      ),
    [panes]
  );
  const previousPane = useCallback(
    () => setCurrentPaneIndex((oldValue) => (oldValue > 0 ? oldValue - 1 : 0)),
    []
  );
  const currentPane = useMemo(
    () => panes[currentPaneIndex],
    [panes, currentPaneIndex]
  );
  return (
    <div className="flex h-navless w-full items-center justify-center gap-4">
      {!!currentPaneIndex && (
        <IconButton
          onClick={previousPane}
          variant={IconButtonVariant.PREVIOUS}
        />
      )}
      <div className="flex w-full flex-col items-center gap-6 pb-8">
        {currentPane}
      </div>
      {currentPaneIndex < panes.length - 1 && (
        <IconButton onClick={nextPane} variant={IconButtonVariant.NEXT} />
      )}
    </div>
  );
});
