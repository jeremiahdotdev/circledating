import { CircleProfile } from "@/components/Circle/CircleProfile";
import { CircleSchemaType } from "@/schemas/Circle";
import { Loading } from "@/components/Shared/Loading";
import { api } from "@/utils/api";
import { isUrl } from "@/schemas/Link";
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

  const circle = {
    ...request.data,
    links: request.data.links.map((link) =>
      isUrl(link.href) ? link : { ...link, href: `https://${link.href}` }
    ),
  } as CircleSchemaType;

  return (
    <main className="mx-auto flex min-h-navless max-w-screen-lg flex-col items-center justify-between pt-6">
      <CircleProfile circle={circle} />
    </main>
  );
});
