import { Button } from "@/components/ui/button";
import { CircleList } from "@/components/Circle/CircleList";
import { CircleSchemaType } from "@/schemas/Circle";
import { Loading } from "@/components/Nav/loading";
import { SearchCirclesForm } from "../../components/Circle/SearchCirclesForm";
import { api } from "@/utils/api";
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
        .catch(console.log);
    },
    [mutateAsync]
  );
  const handleClick = useCallback(() => {
    const route = routes.newCircle();
    router.push(route.href).catch(console.log);
  }, [router]);
  const options = {
    currentUserProfile: state.currentUser,
  };
  const request = api.circles.readFeatured.useQuery(options);

  if (!request.data) return <Loading />;

  const circles = request.data;

  return (
    <main className="flex flex-col items-center justify-between gap-16 p-12">
      <div className="flex flex-col items-center justify-center gap-4 sm:w-3/4">
        <h2 className="w-full text-start text-xl">Suggested for you</h2>
        <div className="max-h-96 w-full">
          <CircleList circles={circles} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 sm:w-3/4">
        <h2 className="w-full text-start text-xl">Find a Circle</h2>
        <SearchCirclesForm handleSearch={handleSearch} />
        <div className="h-96 w-full overflow-y-scroll border py-3 shadow-inner-xl">
          <CircleList circles={searchCirclesState} />
        </div>
      </div>
      <div className="m-12 flex h-full flex-col items-center justify-center gap-4 sm:w-3/4">
        <h2 className="w-full text-center text-xl">
          Don&apos;t have what you&apos;re looking for? Create one!
        </h2>
        <Button className="bg-purple-600" onClick={handleClick}>
          Create a Circle
        </Button>
      </div>
    </main>
  );
});
