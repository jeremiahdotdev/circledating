import { CircleProfile } from "@/components/Circle/CircleProfile";
import { CircleWithAggregatesSchemaType } from "@/schemas/Circle";
import { Loading } from "@/components/Shared/Loading";
import { api } from "@/utils/api";
import { memo } from "react";
import { routerQueryAttributeToString } from "@/utils/routerQueryAttributeToString";
import { useRouter } from "next/router";
import React from "react";

export type CircleProfileViewProps = Record<never, never>;

export const CircleProfileView: React.FC<CircleProfileViewProps> = memo(() => {
  const router = useRouter();
  const circleName = routerQueryAttributeToString(router.query.circle);
  const options = {
    name: circleName.toUpperCase(),
  };
  const request = api.circles.read.useQuery(options);

  if (!request.data) return <Loading />;

  const circle = {
    ...request.data,
  } as CircleWithAggregatesSchemaType;

  // TODO: Check auth
  const isAdmin = true;
  return <CircleProfile circle={circle} canEdit={isAdmin} />;
});
