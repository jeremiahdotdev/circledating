import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { ProfileAttributeOptionType } from "./ProfileAttributeOptions";
import {
  ProfileAttributeType,
  formatProfileAttribute,
} from "@/utils/formatProfileAttribute";
import { Url, isUrl } from "@/schemas/Link";
import { WeightUnit } from "@prisma/client";
import { heightValueMap } from "@/schemas/Height";
import React, { useMemo } from "react";

export type ProfileAttributeOptions = {
  size: string;
  hasBorder?: boolean;
  overrideShowLabel?: boolean;
};

export enum ProfileAttributeVariant {
  PROFILE_CARD = "profile_card",
  DEFAULT = "default",
  PROFILE = "profile",
  PROFILE_LINK = "profile_link",
}

export type ProfileAttributeProps = {
  option: ProfileAttributeOptionType;
  attribute?: ProfileAttributeType | number | Date | Url;
  weightUnit?: WeightUnit;
  isEditMode?: boolean;
  editor?: React.ReactNode;
  variant?: ProfileAttributeVariant;
};

export function ProfileAttribute({
  option,
  attribute,
  weightUnit,
  isEditMode,
  editor,
  variant = ProfileAttributeVariant.DEFAULT,
}: ProfileAttributeProps) {
  const label = useMemo(() => {
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

    if (isUrl(attribute)) {
      return (
        <a className="text-gender-accent" href={attribute}>
          {attribute}
        </a>
      );
    }
    return formatProfileAttribute(attribute);
  }, [attribute, option, weightUnit]);

  const renderVariant = useMemo(() => {
    switch (variant) {
      case ProfileAttributeVariant.PROFILE_CARD:
        return (
          <span className="flex h-full w-full flex-row items-center ">
            <FontAwesomeIcon
              className="aspect-square w-7 pl-2"
              icon={option.icon}
            />
            <b className="flex sm:hidden">
              {option.label} {attribute ? " • " : ""}
            </b>
            <p className="pl-1 text-sm font-extralight text-slate-950">
              {label}
            </p>
          </span>
        );
      case ProfileAttributeVariant.PROFILE:
        return isEditMode ? (
          <span className="mx-2 flex items-center gap-2">
            <FontAwesomeIcon
              className={"aspect-square h-5"}
              icon={option.icon}
            />
            <span className="w-full">{editor}</span>
          </span>
        ) : (
          <span className="grid h-16 grid-cols-2 items-center justify-center gap-1 border-y py-2 sm:mx-4 sm:p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon className={"h-5"} icon={option.icon} />
                <b className="break-normal">{option.label}</b>
              </div>
              <b className="w-fit text-shadow-sm ">&nbsp;•</b>
            </div>
            <div className="pl-1 font-extralight text-slate-950 text-shadow-sm">
              {label}
            </div>
          </span>
        );
      case ProfileAttributeVariant.PROFILE_LINK:
        return (
          <span className="w-full flex-col items-center justify-center border-y sm:w-fit">
            <div className="flex w-full items-center justify-center gap-2 py-5 sm:px-6">
              <FontAwesomeIcon className={"h-6"} icon={option.icon} />
              <div className="pl-1 font-extralight text-gender-accent">
                {label}
              </div>
            </div>
          </span>
        );
      default:
        return <></>;
    }
  }, [variant, attribute, option, label, isEditMode, editor]);
  return (
    <FormattedTooltip content={option.label}>{renderVariant}</FormattedTooltip>
  );
}
