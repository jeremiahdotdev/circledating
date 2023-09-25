import { Button } from "../ui/button";
import { CheckboxList } from "../ui/CheckboxList";
import { CircleSchemaType } from "@/schemas/Circle";
import { ItemType, ParseItem } from "../Shared/ItemList";
import { ListItem } from "../Shared/ListItem";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

export function CurrentUserCircles() {
  const router = useRouter();

  const response = api.preferences.read.useQuery().data;

  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);
      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );

  const renderedCircles = useMemo(() => {
    const currentUserCircles = response?.circles ?? [];
    const currentUserSelectedCircles =
      response?.preferences?.selectedCircles ?? [];
    return currentUserCircles.map((circle) => ({
      value: circle.name,
      checked: currentUserSelectedCircles.map((c) => c.id).includes(circle.id),
      label: (
        <ListItem
          item={ParseItem(circle as CircleSchemaType)}
          hidePicture={true}
          clickAction={handleRoute}
        />
      ),
    }));
  }, [handleRoute, response]);
  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <form className="flex h-full flex-col justify-between">
        {response?.circles && <CheckboxList options={renderedCircles} />}
        <Button type="submit" className="bg-purple-600">
          Save
        </Button>
      </form>
    </div>
  );
}
