import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import {
  faLocationDot,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ProfileLocationProps = {
  willingToRelocate: boolean;
  state?: string | null;
  country?: string;
  isEditMode?: boolean;
  editor?: React.ReactNode;
};

export function ProfileLocation({
  willingToRelocate,
  country,
  state,
  isEditMode,
  editor,
}: ProfileLocationProps) {
  return (
    <span className="flex w-full flex-row items-center justify-center">
      {isEditMode ? (
        <div className="w-full max-w-screen-sm">{editor}</div>
      ) : (
        <span className="flex w-full flex-row items-center justify-center gap-1">
          <FormattedTooltip
            content={willingToRelocate ? "Willing to relocate" : "Location"}
          >
            <FontAwesomeIcon
              className="h-6 w-6 pl-2 text-slate-800"
              icon={willingToRelocate ? faPlaneDeparture : faLocationDot}
            />
          </FormattedTooltip>
          <p className="pl-1 text-sm font-extralight text-slate-950">
            {state && `${state}, `}
            {country}
          </p>
        </span>
      )}
    </span>
  );
}
