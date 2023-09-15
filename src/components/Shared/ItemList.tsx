import { CircleSchemaType } from "@/schemas/Circle";
import { ListItem } from "@/components/Shared/ListItem";
import { ProfileSchemaType } from "@/schemas/Profile";
import { ReportAggregatesSchemaType } from "@/schemas/Report";
import { RequestSchemaType } from "@/schemas/Request";
import { memo } from "react";
import React from "react";

export type ItemType = {
  label: string;
  value: string;
  fallback?: string;
};

export type ItemListProps = {
  items: ItemType[];
  clickAction?: (item: ItemType) => void | undefined;
  deleteAction?: (item: ItemType) => Promise<void> | undefined;
  createAction?: (item: ItemType) => Promise<void> | undefined;
};

export const ItemList = memo(
  ({ items, clickAction, deleteAction, createAction }: ItemListProps) => {
    return items.length ? (
      items.map((item, index) => (
        <ListItem
          key={`list-item-${index}`}
          item={item}
          clickAction={clickAction}
          deleteAction={deleteAction}
          createAction={createAction}
          deleteRequiresConfirmation={true}
          createRequiresConfirmation={false}
        />
      ))
    ) : (
      <b className="flex h-full w-full items-center justify-center">
        No results.
      </b>
    );
  }
);

export type ParseItemTypes =
  | ProfileSchemaType
  | CircleSchemaType
  | RequestSchemaType
  | ReportAggregatesSchemaType;

export function isCircle(x: ParseItemTypes): x is CircleSchemaType {
  return (
    !!(x as CircleSchemaType)?.name &&
    typeof (x as CircleSchemaType).name === "string"
  );
}
export function isProfile(x: ParseItemTypes): x is ProfileSchemaType {
  return (
    !!(x as ProfileSchemaType)?.username &&
    typeof (x as ProfileSchemaType).username === "string"
  );
}
export function isReportAggregate(
  x: ParseItemTypes
): x is ReportAggregatesSchemaType {
  return (
    !!(x as ReportAggregatesSchemaType)?.reportedUsername &&
    typeof (x as ReportAggregatesSchemaType).reportedUsername === "string"
  );
}

export function ParseItem(x: ParseItemTypes) {
  if (isCircle(x)) {
    return { label: x.label, value: x.name } as ItemType;
  } else if (isProfile(x)) {
    return { label: x.username, value: x.userId } as ItemType;
  } else if (isReportAggregate(x)) {
    return {
      fallback: x._count.reportedUsername,
      label: x.reportedUsername,
      value: x.reportedUsername,
    } as ItemType;
  } else {
    return { label: x.username, value: x.userId } as ItemType;
  }
}
