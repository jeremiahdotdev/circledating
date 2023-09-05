import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { ProfileAttributeOptionType } from "./ProfileAttributeOptions";
import {
  ProfileAttributeType,
  formatProfileAttribute,
} from "@/utils/formatProfileAttribute";
import { WeightUnit } from "@prisma/client";
import { heightValueMap } from "@/schemas/Height";
import React, { useMemo } from "react";

export type ProfileAttributeOptions = {
  size: string;
  hasBorder?: boolean;
  overrideShowLabel?: boolean;
};

export enum ProfileAttributeVariant {
  SMALL = "small",
  DEFAULT = "default",
  LARGE = "large",
}

export type ProfileAttributeProps = {
  option: ProfileAttributeOptionType;
  attribute?: ProfileAttributeType | number | Date;
  weightUnit?: WeightUnit;
  variant?: ProfileAttributeVariant;
};

export function ProfileAttribute({
  option,
  attribute,
  weightUnit,
  variant = ProfileAttributeVariant.DEFAULT,
}: ProfileAttributeProps) {
  const labelText = useMemo(() => {
    if (!attribute) return option.label;

    if (typeof attribute === "number" && option.isHeight) {
      return heightValueMap[attribute];
    }

    if (typeof attribute === "number" && weightUnit) {
      return `${attribute} ${weightUnit?.toLocaleLowerCase()}`;
    }

    if (typeof attribute === "number") {
      return attribute.toString();
    }

    if (attribute instanceof Date) {
      return attribute.toLocaleDateString();
    }

    return formatProfileAttribute(attribute);
  }, [attribute, option, weightUnit]);

  const renderVariant = useMemo(() => {
    switch (variant) {
      case ProfileAttributeVariant.SMALL:
        return (
          <>
            <FontAwesomeIcon
              className="aspect-square h-5 w-5 pl-2"
              icon={option.icon}
            />
            <b className="flex sm:hidden">
              {option.label} {attribute ? " • " : ""}
            </b>
            <p className="pl-1 text-sm font-extralight text-slate-950">
              {labelText}
            </p>
          </>
        );
      case ProfileAttributeVariant.LARGE:
        return (
          <span className="grid h-16 w-full grid-cols-2 items-center justify-center gap-1 border-y py-2 sm:mx-4 sm:p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon className={"h-6 p-2"} icon={option.icon} />
                <b className="break-normal sm:w-full">{option.label}</b>
              </div>
              <b className="w-fit">&nbsp;•</b>
            </div>
            <div className="pl-1 font-extralight text-slate-950">
              {labelText}
            </div>
          </span>
        );
      default:
        return <></>;
    }
  }, [variant, attribute, labelText, option]);
  return (
    <span className="flex">
      <FormattedTooltip content={option.label}>
        {renderVariant}
      </FormattedTooltip>
    </span>
  );
}
