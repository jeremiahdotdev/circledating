import { IconButton } from "../Shared/IconButton";
import { IconButtonVariant } from "@/schemas/Button";
import { memo, useCallback, useMemo, useState } from "react";
import React from "react";

type Pane = {
  paneId: string;
  component: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
};

export type PaneQueueProps = {
  panes: Pane[];
};

export const PaneQueue = memo(({ panes }: PaneQueueProps) => {
  const [currentPaneIndex, setCurrentPaneIndex] = useState(0);
  const nextPane = useCallback(() => {
    setCurrentPaneIndex((oldValue) =>
      oldValue < panes.length - 1 ? oldValue + 1 : 0
    );
  }, [panes]);
  const previousPane = useCallback(
    () => setCurrentPaneIndex((oldValue) => (oldValue > 0 ? oldValue - 1 : 0)),
    []
  );
  const { paneId, component, isDisabled, isRequired } = useMemo(
    () => panes[currentPaneIndex],
    [panes, currentPaneIndex]
  );

  return (
    <div
      key={paneId}
      className="flex h-navless w-full items-center justify-center gap-4"
    >
      {!!currentPaneIndex && (
        <IconButton
          onClick={previousPane}
          variant={IconButtonVariant.PREVIOUS}
        />
      )}
      <div className="flex w-full flex-col items-center gap-6 pb-8">
        {component}
      </div>
      {currentPaneIndex < panes.length - 1 && (
        <IconButton
          disabled={isRequired && isDisabled}
          onClick={nextPane}
          variant={IconButtonVariant.NEXT}
        />
      )}
    </div>
  );
});
