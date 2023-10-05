import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { RouteOption } from "@/globals/routes";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { SystemMessageType } from "@/globals/systemMessages";
import React, { useMemo } from "react";

export type AnchorVariantOptions = {
  style: string;
};

export enum AnchorVariant {
  PROFILE = "mail",
  AUTH = "auth",
}

export type AnchorProps = {
  variant: AnchorVariant;
  option: RouteOption;
  message: SystemMessageType;
};

export function Anchor({ message, variant, option }: AnchorProps) {
  const theme = useMemo(() => {
    switch (variant) {
      case AnchorVariant.PROFILE:
        return {
          style: "text-2xl hover:underline hover:text-gray-600",
        } as AnchorVariantOptions;
      default: // Auth
        return {
          style: "text-md hover:underline text-gray-400",
        } as AnchorVariantOptions;
    }
  }, [variant]);

  const renderLink = useMemo(
    () => (
      <RouteOptionLink option={option} className={theme.style}>
        {message.message}
      </RouteOptionLink>
    ),
    [message, option, theme]
  );

  return message.tooltip ? (
    <FormattedTooltip content={message.tooltip}>{renderLink}</FormattedTooltip>
  ) : (
    renderLink
  );
}
