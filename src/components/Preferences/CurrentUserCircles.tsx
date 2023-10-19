import { CheckboxList } from "../ui/CheckboxList";
import { Form } from "../ui/form";
import { IconButton, IconButtonVariant } from "../Shared/IconButton";
import { Infographic } from "../Shared/Infographic";
import { ItemType, ParseItem } from "../Shared/ItemList";
import { ListItem } from "../Shared/ListItem";
import {
  ReadCircleSchemaType,
  SelectedCirclesSchema,
  SelectedCirclesSchemaType,
} from "@/schemas/Circle";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { routes } from "@/globals/routes";
import { systemMessages } from "@/globals/systemMessages";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useMemo } from "react";

export type CurrentUserCirclesProps = {
  circles?: ReadCircleSchemaType[];
  setClosed: () => void;
};
export function CurrentUserCircles({
  circles,
  setClosed,
}: CurrentUserCirclesProps) {
  const router = useRouter();
  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);
      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );

  const renderedCircles = useMemo(() => {
    return circles?.map((circle) => ({
      value: circle.name,
      checked: circle.isSelected,
      label: circle && (
        <ListItem
          item={ParseItem(circle)}
          hidePicture={true}
          clickAction={handleRoute}
        />
      ),
    }));
  }, [handleRoute, circles]);

  const form = useForm<SelectedCirclesSchemaType>({
    resolver: zodResolver(SelectedCirclesSchema),
    defaultValues: {
      circles: circles,
      selectedCircles: [],
    },
  });

  const { mutateAsync } = api.preferences.saveCircles.useMutation();

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: SelectedCirclesSchemaType) => {
      mutateAsync(data).catch(handleError);
    },
    [mutateAsync]
  );

  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="mt-4 flex h-full max-h-navless w-full flex-col justify-between px-4 shadow-inner"
      >
        {renderedCircles && renderedCircles.length ? (
          <CheckboxList
            control={form.control}
            name="selectedCircles"
            options={renderedCircles}
          />
        ) : (
          <Infographic
            bubbleless={true}
            message={systemMessages.GETTING_STARTED}
          />
        )}
        <IconButton
          variant={IconButtonVariant.SAVE}
          hover={true}
          type="submit"
          onClick={setClosed}
        />
      </Form>
    </div>
  );
}
