import { CircleSchemaType } from "@/schemas/Circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonVariant } from "./IconButton";
import { ListItemPicture } from "../ui/ListItemPicture";
import { ProfileSchemaType } from "@/schemas/Profile";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export type ListItemProps = {
  item: CircleSchemaType | ProfileSchemaType;
  hidePicture?: boolean;
  deleteRequiresConfirmation?: boolean;
  deleteAction?: (item: ProfileSchemaType | CircleSchemaType) => void;
};

export function isCircle(
  x: CircleSchemaType | ProfileSchemaType
): x is CircleSchemaType {
  return (
    !!(x as CircleSchemaType)?.name &&
    typeof (x as CircleSchemaType).name === "string"
  );
}

export function isCircleFunction(
  x:
    | ((valueToDelete: ProfileSchemaType) => void)
    | ((valueToDelete: CircleSchemaType) => void)
): x is (valueToDelete: CircleSchemaType) => void {
  return !!(x as (valueToDelete: CircleSchemaType) => void);
}

export function ListItem({
  item,
  hidePicture,
  deleteRequiresConfirmation,
  deleteAction,
}: ListItemProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (deleteAction) deleteAction(item);
  }, [deleteAction, item]);
  const getVariant = (x: CircleSchemaType | ProfileSchemaType) => {
    if (isCircle(x)) {
      return {
        label: x.label,
        option: routes.circleByCircleName(x.name),
      };
    } else {
      return {
        label: x.username,
        option: routes.profileByUsername(x.username),
      };
    }
  };
  const variant = getVariant(item);
  const handleRoute = useCallback(() => {
    router.push(variant.option.href).catch(handleError);
  }, [router, variant]);
  return (
    <div className="w-full cursor-pointer px-4" onClick={handleRoute}>
      <span className="flex items-center border-y py-2">
        {!hidePicture && (
          <div className="flex items-center justify-between">
            <ListItemPicture
              // TODO: Replace with actual picture.
              fallback={variant.label.substring(0, 1)}
              alt={variant.label}
            />
          </div>
        )}
        <div className="flex w-full justify-center font-extralight text-slate-950">
          {variant.label}
        </div>
        <div className="flex min-h-[40px] cursor-pointer items-center justify-center gap-2">
          <FontAwesomeIcon className="h-6" icon={faMagnifyingGlass} />
          {deleteAction && (
            <IconButton
              variant={IconButtonVariant.REMOVE}
              onClick={handleClick}
              confirmationRequired={deleteRequiresConfirmation}
            />
          )}
        </div>
      </span>
    </div>
  );
}
