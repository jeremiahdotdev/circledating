import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedTooltip } from "@/components/ui/FormattedTooltip";
import { cn } from "@/lib/utils";
import { faEnvelope, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type ProfileCardButtonProps = {
  label: string;
  variant: string;
};

export function ProfileCardButton({ label, variant }: ProfileCardButtonProps) {
  return (
    <FormattedTooltip content={label}>
      <Button
        className={cn(
          "w-16 h-16 text-white rounded-full shadow",
          variant === "green" ? `bg-green-600` : `bg-red-600`
        )}
      >
        <FontAwesomeIcon
          className="h-full w-full"
          icon={variant === "green" ? faEnvelope : faTrashCan}
        />
      </Button>
    </FormattedTooltip>
  );
}
