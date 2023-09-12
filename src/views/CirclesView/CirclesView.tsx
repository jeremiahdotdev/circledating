import { Button } from "@/components/ui/button";
import { CircleSchemaType } from "@/schemas/Circle";
import { ItemList, ItemType, ParseItem } from "@/components/Shared/ItemList";
import { Loading } from "@/components/Shared/Loading";
import { SearchForm } from "../../components/Circle/SearchForm";
import { api } from "@/utils/api";
import { handleError } from "@/utils/handleError";
import { memo, useCallback, useState } from "react";
import { routes } from "@/globals/routes";
import { useRouter } from "next/router";
import React from "react";
import state from "@/utils/user.store";

export type CirclesViewProps = Record<never, never>;

export const CirclesView: React.FC<CirclesViewProps> = memo(() => {
  const router = useRouter();
  const { mutateAsync } = api.circles.searchMany.useMutation();
  const [searchCirclesState, setSearchCirclesState] = useState(
    [] as CircleSchemaType[]
  );
  const handleSearch = useCallback(
    (searchText: string) => {
      mutateAsync({
        circleNamePartial: searchText,
        currentUserProfile: state.currentUser,
      })
        .then(setSearchCirclesState)
        .catch(handleError);
    },
    [mutateAsync]
  );
  const handleClick = useCallback(() => {
    const route = routes.newCircle();
    router.push(route.href).catch(handleError);
  }, [router]);
  const handleRoute = useCallback(
    (circleNameItem: ItemType) => {
      const route = routes.circleByCircleNameAsLabel(circleNameItem.value);
      router.push(route.href, route.as).catch(handleError);
    },
    [router]
  );
  const requestFeatured = api.circles.readFeatured.useQuery({
    currentUserProfile: state.currentUser,
  });
  const requestCurrent = api.circles.readCirclesByUser.useQuery({
    userId: state.currentUser.userId,
  });

  if (!requestFeatured.data || !requestCurrent.data) return <Loading />;

  const featuredCircles = requestFeatured.data;
  const currentCircles = requestCurrent.data;

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col items-center justify-between gap-16 px-2 py-12 sm:w-3/4">
        {currentCircles.length && (
          <div className="flex w-full flex-col gap-4">
            <h2 className="w-full text-start text-xl">Your Circles</h2>
            <div className="max-h-96 w-full">
              <ItemList
                items={currentCircles.map(ParseItem)}
                clickAction={handleRoute}
              />
            </div>
          </div>
        )}
        {featuredCircles.length && (
          <div className="flex w-full flex-col gap-4">
            <h2 className="w-full text-start text-xl">Suggested for you</h2>
            <div className="max-h-96 w-full">
              <ItemList
                items={featuredCircles.map(ParseItem)}
                clickAction={handleRoute}
              />
            </div>
          </div>
        )}
        <div className="flex w-full flex-col gap-4">
          <h2 className="w-full text-start text-xl">Find a Circle</h2>
          <SearchForm handleSearch={handleSearch} />
          <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
            <ItemList
              items={searchCirclesState.map(ParseItem)}
              clickAction={handleRoute}
            />
          </div>
        </div>
        <div className="m-12 flex h-full w-full flex-col items-center justify-center gap-4">
          <h2 className="w-full text-center text-xl">
            Don&apos;t have what you&apos;re looking for? Create one!
          </h2>
          <Button className="bg-purple-600" onClick={handleClick}>
            Create a Circle
          </Button>
        </div>
      </div>
    </div>
  );
});
