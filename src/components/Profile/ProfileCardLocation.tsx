import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ProfileLocationProps = {
  willingToRelocate: boolean;
};

export function ProfileLocation({ willingToRelocate }: ProfileLocationProps) {
  if (!willingToRelocate) return;

  return (
    <FormattedTooltip content="Willing to relocate">
      <FontAwesomeIcon
        className="h-4 w-4 pl-2 text-slate-800"
        icon={faPlaneDeparture}
      />
    </FormattedTooltip>
  );
}
