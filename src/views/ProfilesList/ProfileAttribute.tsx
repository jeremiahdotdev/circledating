import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Religion } from "@prisma/client";
import { formatProfileAttribute } from "@/utils/formatProfileAttribute";
import React, { useMemo } from "react";

export type ProfileAttributeProps = {
  icon: IconDefinition;
  label?: string;
  attribute?: Religion;
  tooltip: string;
};

export function ProfileAttribute({
  icon,
  label,
  attribute,
  tooltip,
}: ProfileAttributeProps) {
  const labelText = useMemo(() => {
    if (label) return label;

    if (!attribute) return "Unknown";

    return formatProfileAttribute(attribute);
  }, [attribute, label]);

  return (
    <span className="flex-1">
      <FormattedTooltip content={tooltip}>
        <span className="flex flex-row flex-wrap gap-1">
          <FontAwesomeIcon className="h-5 w-5" icon={icon} />
          {labelText}
        </span>
      </FormattedTooltip>
    </span>
  );
}
