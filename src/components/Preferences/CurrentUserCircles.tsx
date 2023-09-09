import { Button } from "../ui/button";
import { CheckboxList } from "../ui/CheckboxList";
import { ListItem } from "../Shared/ListItem";
import React, { useMemo } from "react";
import state from "@/utils/user.store";

export function CurrentUserCircles() {
  const currentUserCircles = state.currentUserPreferences.selectedCircles;
  const renderedCircles = useMemo(
    () =>
      state.currentUser.circles.map((circle) => ({
        value: circle.name,
        checked: currentUserCircles.includes(circle),
        label: <ListItem item={circle} hidePicture={true} />,
      })),
    [currentUserCircles]
  );
  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <form className="flex h-full flex-col justify-between">
        <CheckboxList options={renderedCircles} />
        <Button type="submit" className="bg-purple-600">
          Save
        </Button>
      </form>
    </div>
  );
}
