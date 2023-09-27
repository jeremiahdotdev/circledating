import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonVariant } from "./IconButton";
import { ItemType } from "./ItemList";
import { ListItemPicture } from "../ui/ListItemPicture";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback } from "react";

export type ListItemProps = {
  item: ItemType;
  hidePicture?: boolean;
  clickAction?: (item: ItemType) => void | undefined;
  deleteRequiresConfirmation?: boolean;
  deleteAction?: (item: ItemType) => Promise<void> | undefined;
  createRequiresConfirmation?: boolean;
  createAction?: (item: ItemType) => Promise<void> | undefined;
};

export function ListItem({
  item,
  hidePicture,
  clickAction,
  deleteRequiresConfirmation,
  deleteAction,
  createRequiresConfirmation,
  createAction,
}: ListItemProps) {
  const handleDeleteClick = useCallback(() => {
    if (deleteAction) return deleteAction(item);
  }, [deleteAction, item]);

  const handleCreateClick = useCallback(() => {
    if (createAction) return createAction(item);
  }, [createAction, item]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (clickAction) return clickAction(item);
    },
    [clickAction, item]
  );

  return (
    <div className="w-full cursor-pointer px-4" onClick={handleClick}>
      <span className="flex items-center border-y py-2">
        {!hidePicture && (
          <div className="flex items-center justify-between">
            <ListItemPicture
              fallback={item.fallback ?? item.label.substring(0, 1)}
              alt={item.label}
            />
          </div>
        )}
        <div className="flex w-full justify-center font-extralight text-slate-950 text-shadow-sm">
          {item.label}
        </div>
        <div className="flex min-h-[40px] cursor-pointer items-center justify-center gap-2">
          <FontAwesomeIcon
            className="h-6 drop-shadow-2xl"
            icon={faMagnifyingGlass}
          />
          {deleteAction && (
            <IconButton
              variant={IconButtonVariant.REMOVE}
              action={handleDeleteClick}
              confirmationRequired={deleteRequiresConfirmation}
            />
          )}
          {createAction && (
            <IconButton
              variant={IconButtonVariant.ADD}
              action={handleCreateClick}
              confirmationRequired={createRequiresConfirmation}
            />
          )}
        </div>
      </span>
    </div>
  );
}
