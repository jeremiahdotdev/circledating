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
  overrideShowLabel?: boolean;
};

export function ProfileAttribute({
  icon,
  attribute,
  label,
  overrideShowLabel,
  isHeight,
  weightUnit,
}: ProfileAttributeProps) {
  const labelText = useMemo(() => {
    if (!attribute) return label;

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
  }, [attribute, isHeight, label, weightUnit]);

  return (
    <span className=" flex">
      <FormattedTooltip content={label}>
        <span className="flex flex-row gap-1">
          <FontAwesomeIcon className="h-5 w-5 pl-2" icon={icon} />
          {!overrideShowLabel && (
            <b className="flex sm:hidden">
              {label} {attribute ? " • " : ""}
            </b>
          )}
          <p className="pl-1 text-sm font-extralight text-slate-950">
            {labelText}
          </p>
        </span>
      </FormattedTooltip>
    </span>
  );
}
