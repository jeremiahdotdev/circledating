import { CircleSchemaType } from "@/schemas/Circle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListItemPicture } from "../ui/ListItemPicture";
import { RouteOptionLink } from "@/utils/RouteOptionLink";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { routes } from "@/globals/routes";
import React from "react";

export type ListItemCircleProps = {
  circle: CircleSchemaType;
};

export function ListItemCircle({ circle }: ListItemCircleProps) {
  return (
    <RouteOptionLink option={routes.circleByCircleName(circle.name)}>
      <div className="w-full px-4">
        <span className="flex items-center border-y py-2">
          <div className="flex items-center justify-between">
            <ListItemPicture
              // TODO: Replace with actual picture.
              fallback={circle.name.substring(0, 1)}
              alt={circle.name}
            />
          </div>
          <div className="flex w-full justify-center font-extralight text-slate-950">
            {circle.label}
          </div>
          <div className="min-w-[40px] cursor-pointer">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </span>
      </div>
    </RouteOptionLink>
  );
}
