import { CheckboxList } from "../ui/CheckboxList";
import { Form } from "../ui/form";
import { FormButton } from "../ui/FormButton";
import { Infographic } from "../Shared/Infographic";
import { ItemType, ParseItem } from "../Shared/ItemList";
import { ListItem } from "../Shared/ListItem";
import {
  MutateUserPreferencesSchema,
  MutateUserPreferencesSchemaType,
} from "@/schemas/UserPreferences";
import { ReadCircleSchemaType } from "@/schemas/Circle";
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
  selectedCircles?: ReadCircleSchemaType[];
};
export function CurrentUserCircles({
  circles,
  selectedCircles,
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
      value: circle,
      checked: selectedCircles?.map((c) => c?.id)?.includes(circle?.id ?? ""),
      label: circle && (
        <ListItem
          item={ParseItem(circle)}
          hidePicture={true}
          clickAction={handleRoute}
        />
      ),
    }));
  }, [handleRoute, circles, selectedCircles]);

  const form = useForm<MutateUserPreferencesSchemaType>({
    resolver: zodResolver(MutateUserPreferencesSchema),
    defaultValues: {
      userId: "<RESOLVED-ON-SERVER>",
    },
  });

  const { mutateAsync } = api.preferences.save.useMutation();

  const onInvalidData = useCallback(handleError, []);
  const onValidData = useCallback(
    (data: MutateUserPreferencesSchemaType) => {
      mutateAsync(data).catch(handleError);
    },
    [mutateAsync]
  );

  return (
    <div className="flex h-full max-h-navless w-full flex-col">
      <Form
        form={form}
        onSubmit={form.handleSubmit(onValidData, onInvalidData)}
        className="flex h-full max-h-navless w-full flex-col justify-between pt-4 shadow-inner"
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
        <FormButton label="Save" className="mx-4" />
      </Form>
    </div>
  );
}
