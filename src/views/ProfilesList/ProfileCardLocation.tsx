import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ProfileLocationProps = {
  willingToRelocate: boolean;
};

export function ProfileLocation({ willingToRelocate }: ProfileLocationProps) {
  if (!willingToRelocate) return;

  return (
    <FormattedTooltip content="Willing to relocate">
      <FontAwesomeIcon className="h-3 w-3 pl-2 text-slate-800" icon={faPlane} />
    </FormattedTooltip>
  );
}
