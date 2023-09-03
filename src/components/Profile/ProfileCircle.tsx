import { CircleSchemaType } from "@/schemas/Circle";
import { ListItemPicture } from "../ui/ListItemPicture";
import React from "react";

export type ProfileProps = {
  circle: CircleSchemaType;
};

export function ProfileCircle({ circle }: ProfileProps) {
  return (
    <div className="px-4">
      <span className="flex items-center border-y py-2">
        <div className="flex items-center justify-between">
          <ListItemPicture
            // TODO: Replace with actual picture.
            fallback={circle.name.substring(0, 1)}
            alt={circle.name}
          />
        </div>
        <div className="flex w-full justify-center font-extralight text-slate-950">
          {circle.name}
        </div>
      </span>
    </div>
  );
}
