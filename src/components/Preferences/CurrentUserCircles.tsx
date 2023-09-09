import { Button } from "../ui/button";
import { CheckboxList } from "../ui/CheckboxList";
import { ItemType, ParseItem } from "../Shared/ItemList";
import { ListItem } from "../Shared/ListItem";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import state from "@/utils/user.store";

export function CurrentUserCircles() {
  const router = useRouter();

  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);
      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );

  const renderedCircles = useMemo(() => {
    const currentUserCircles = state.currentUser.circles ?? [];
    return currentUserCircles.map((circle) => ({
      value: circle.name,
      checked: state.currentUserPreferences.selectedCircles.includes(circle),
      label: (
        <ListItem
          item={ParseItem(circle)}
          hidePicture={true}
          clickAction={handleRoute}
        />
      ),
    }));
  }, [handleRoute]);
  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <form className="flex h-full flex-col justify-between">
        {state.currentUser.circles && (
          <CheckboxList options={renderedCircles} />
        )}
        <Button type="submit" className="bg-purple-600">
          Save
        </Button>
      </form>
    </div>
  );
}
