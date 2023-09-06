import { CircleSchemaType } from "@/schemas/Circle";
import { ListItemCircle } from "@/components/Circle/ListItemCircle";
import { memo } from "react";
import React from "react";

export type CircleListProps = {
  circles: CircleSchemaType[];
};

export const CircleList = memo(({ circles }: CircleListProps) => {
  return circles.length ? (
    circles.map((circle) => (
      <ListItemCircle key={circle.name} circle={circle} />
    ))
  ) : (
    <b className="flex h-full w-full items-center justify-center">
      No results.
    </b>
  );
});
