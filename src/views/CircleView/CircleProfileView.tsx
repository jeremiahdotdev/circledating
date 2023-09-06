import { CircleProfile } from "@/components/Circle/CircleProfile";
import { Loading } from "@/components/Shared/Loading";
import { api } from "@/utils/api";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import React from "react";
import state from "@/utils/user.store";

export type CircleProfileViewProps = Record<never, never>;

export const CircleProfileView: React.FC<CircleProfileViewProps> = memo(() => {
  const router = useRouter();
  const circleName = routerQueryAttributeToString(router.query.circle);
  const options = {
    name: circleName,
    currentUserProfile: state.currentUser,
  };
  const request = api.circles.read.useQuery(options);

  if (!request.data) return <Loading />;

  const circle = request.data;

  return (
    <main className="mx-auto flex min-h-navless max-w-screen-lg flex-col items-center justify-between pt-6">
      <CircleProfile circle={circle} />
    </main>
  );
});
