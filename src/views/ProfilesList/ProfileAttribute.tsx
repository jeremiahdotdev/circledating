import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export type ProfileAttributeProps = {
  icon: IconDefinition;
  label: string;
  tooltip: string;
};

export function ProfileAttribute({
  icon,
  label,
  tooltip,
}: ProfileAttributeProps) {
  return (
    <span className="flex">
      <FormattedTooltip content={tooltip}>
        <span className="flex flex-row gap-1">
          <FontAwesomeIcon className="h-5 w-5" icon={icon} />
          {label}
        </span>
      </FormattedTooltip>
    </span>
  );
}
