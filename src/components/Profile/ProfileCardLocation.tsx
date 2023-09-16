import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  faLocationDot,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ProfileLocationProps = {
  willingToRelocate: boolean;
  state?: string;
  country: string;
};

export function ProfileLocation({
  willingToRelocate,
  country,
  state,
}: ProfileLocationProps) {
  return (
    <span className="flex flex-row items-center">
      <span className="flex flex-row items-center gap-1">
        <FormattedTooltip
          content={willingToRelocate ? "Willing to relocate" : "Location"}
        >
          <FontAwesomeIcon
            className="h-8 w-8 pl-2 text-slate-800"
            icon={willingToRelocate ? faPlaneDeparture : faLocationDot}
          />
        </FormattedTooltip>

        <p className="pl-1 text-sm font-extralight text-slate-950">
          {state && `${state}, `}
          {country}
        </p>
      </span>
    </span>
  );
}
