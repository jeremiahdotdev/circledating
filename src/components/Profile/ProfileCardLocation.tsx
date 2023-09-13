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
      <span className="flex flex-row gap-1">
        <FontAwesomeIcon className="h-5 w-5 pl-2" icon={faLocationDot} />
        <p className="pl-1 text-sm font-extralight text-slate-950">
          {state && `${state}, `}
          {country}
        </p>
      </span>

      {willingToRelocate && (
        <FormattedTooltip content="Willing to relocate">
          <FontAwesomeIcon
            className="h-4 w-4 pl-2 text-slate-800"
            icon={faPlaneDeparture}
          />
        </FormattedTooltip>
      )}
    </span>
  );
}
