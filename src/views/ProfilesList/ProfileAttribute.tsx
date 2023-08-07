import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  ProfileAttributeType,
  formatProfileAttribute,
} from "@/utils/formatProfileAttribute";
import { WeightUnit } from "@prisma/client";
import { heightValueMap } from "@/schemas/Height";
import React, { useMemo } from "react";

export type ProfileAttributeProps = {
  icon: IconDefinition;
  label: string;
  attribute?: ProfileAttributeType | number;
  showLabel?: boolean;
  isHeight?: boolean;
  weightUnit?: WeightUnit;
};

export function ProfileAttribute({
  icon,
  label,
  attribute,
  showLabel = true,
  isHeight,
  weightUnit,
}: ProfileAttributeProps) {
  const labelText = useMemo(() => {
    if (!attribute) return "";

    if (typeof attribute === "number" && isHeight) {
      return heightValueMap[attribute];
    }

    if (typeof attribute === "number" && weightUnit) {
      return `${attribute} ${weightUnit?.toLocaleLowerCase()}`;
    }

    if (typeof attribute === "number") {
      return attribute.toString();
    }

    return formatProfileAttribute(attribute);
  }, [attribute, isHeight, weightUnit]);

  return (
    <span className="flex-1">
      <FormattedTooltip content={label}>
        <span className="flex flex-row items-center gap-1">
          <FontAwesomeIcon className="h-4 w-4 text-slate-950" icon={icon} />
          {showLabel && (
            <p className="pl-1 font-extralight text-slate-950">
              {label}
              {attribute ? " • " : ""}
            </p>
          )}
          {labelText}
        </span>
      </FormattedTooltip>
    </span>
  );
}
