import { CircleSchemaType } from "@/schemas/Circle";
import { ListItem } from "@/components/Shared/ListItem";
import { ProfileSchemaType } from "@/schemas/Profile";
import { memo } from "react";
import React from "react";

export type ItemListProps = {
  items: ProfileSchemaType[] | CircleSchemaType[];
  deleteAction?: (
    item: ProfileSchemaType | CircleSchemaType
  ) => Promise<void> | undefined;
};

export const ItemList = memo(({ items, deleteAction }: ItemListProps) => {
  return items.length ? (
    items.map((item, index) => (
      <ListItem
        key={`list-item-${index}`}
        item={item}
        deleteAction={deleteAction}
        deleteRequiresConfirmation={true}
      />
    ))
  ) : (
    <b className="flex h-full w-full items-center justify-center">
      No results.
    </b>
  );
});
